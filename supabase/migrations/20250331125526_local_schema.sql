drop trigger if exists "trg_log_task_delete" on "public"."tasks";

alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."group_invitations" alter column "invitation_token" drop default;

alter table "public"."statuses" add column "sort_order" smallint not null default '0'::smallint;

CREATE UNIQUE INDEX statuses_sort_order_key ON public.statuses USING btree (sort_order);

alter table "public"."statuses" add constraint "statuses_sort_order_key" UNIQUE using index "statuses_sort_order_key";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.clean_up_group_data()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    -- 1. グループの招待を削除
    DELETE FROM public.group_invitations
    WHERE group_id = OLD.id;

    -- 2. グループの参加リクエストを削除（group_invitationsのカスケード削除で自動的に削除される可能性もある）
    DELETE FROM public.join_requests
    WHERE invitation_id IN (
        SELECT id FROM public.group_invitations WHERE group_id = OLD.id
    );

    -- 3. グループのタスク履歴を削除
    DELETE FROM public.task_history
    WHERE task_id IN (
        SELECT id FROM public.tasks WHERE group_id = OLD.id
    );

    -- 4. グループのタスクを削除
    DELETE FROM public.tasks
    WHERE group_id = OLD.id;

    -- 5. ユーザーとグループの関連付けを削除
    DELETE FROM public.user_groups
    WHERE group_id = OLD.id;

    RETURN OLD;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.delete_expired_invitations()
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin
  delete from group_invitations
  where expires_at < now();
end;
$function$
;

CREATE OR REPLACE FUNCTION public.log_task_changes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    completed_status_id UUID;
    action_id UUID;
BEGIN
    -- 完了ステータスのIDを取得
    SELECT id INTO completed_status_id FROM public.statuses WHERE status_name = '完了';

    -- 1) INSERT の場合: 'created' を登録
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.task_history (
          id,
          task_id,
          action_id,
          changed_by,
          changed_at,
          details
        ) VALUES (
          uuid_generate_v4(),
          NEW.id,
          (SELECT id FROM public.actions WHERE action_name = 'created'),
          NEW.created_by,
          NOW(),
          json_build_object('old', NULL, 'new', row_to_json(NEW))
        );
        RETURN NEW;

    -- 2) UPDATE の場合: 'updated' または 'completed' を登録
    ELSIF TG_OP = 'UPDATE' THEN
        -- ステータスが「完了」に変更されたかチェック
        IF OLD.status_id != completed_status_id AND NEW.status_id = completed_status_id THEN
            -- 完了に変更された場合は 'completed' アクションを使用
            SELECT id INTO action_id FROM public.actions WHERE action_name = 'completed';
        ELSE
            -- それ以外の変更は通常の 'updated' アクション
            SELECT id INTO action_id FROM public.actions WHERE action_name = 'updated';
        END IF;

        INSERT INTO public.task_history (
          id,
          task_id,
          action_id,
          changed_by,
          changed_at,
          details
        ) VALUES (
          uuid_generate_v4(),
          NEW.id,
          action_id,
          NEW.updated_by,
          NOW(),
          json_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
        );
        RETURN NEW;

    -- 3) DELETE の場合: 'deleted' を登録
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO public.task_history (
          id,
          task_id,
          action_id,
          changed_by,
          changed_at,
          details
        ) VALUES (
          uuid_generate_v4(),
          OLD.id,
          (SELECT id FROM public.actions WHERE action_name = 'deleted'),
          OLD.updated_by,
          NOW(),
          json_build_object('old', row_to_json(OLD), 'new', NULL)
        );
        RETURN OLD;
    END IF;
END;
$function$
;

create policy "Allow update on tasks in own groups"
on "public"."tasks"
as permissive
for update
to public
using (((created_by = auth.uid()) OR (group_id IN ( SELECT user_groups.group_id
   FROM user_groups
  WHERE (user_groups.user_id = auth.uid())))));


create policy "ユーザーは自分自身のグループ関連を削除でき"
on "public"."user_groups"
as permissive
for delete
to public
using ((auth.uid() = user_id));


CREATE TRIGGER trg_clean_up_group_data BEFORE DELETE ON public.groups FOR EACH ROW EXECUTE FUNCTION clean_up_group_data();


