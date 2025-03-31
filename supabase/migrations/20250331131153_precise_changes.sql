drop policy "Allow update on own tasks" on "public"."tasks";

alter table "public"."actions" enable row level security;

alter table "public"."group_invitations" alter column "invitation_token" drop default;

alter table "public"."permissions" enable row level security;

alter table "public"."statuses" add column "sort_order" smallint not null default '0'::smallint;

alter table "public"."statuses" enable row level security;

alter table "public"."task_history" enable row level security;

CREATE UNIQUE INDEX statuses_sort_order_key ON public.statuses USING btree (sort_order);

alter table "public"."statuses" add constraint "statuses_sort_order_key" UNIQUE using index "statuses_sort_order_key";

set check_function_bodies = off;

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

create policy "read_actions_authenticated"
on "public"."actions"
as permissive
for select
to authenticated
using (true);


create policy "read_permissions_authenticated"
on "public"."permissions"
as permissive
for select
to authenticated
using (true);


create policy "read_statuses_authenticated"
on "public"."statuses"
as permissive
for select
to authenticated
using (true);


create policy "allow_insert_task_history"
on "public"."task_history"
as permissive
for insert
to authenticated
with check (((changed_by = auth.uid()) AND ((EXISTS ( SELECT 1
   FROM tasks
  WHERE ((tasks.id = task_history.task_id) AND (tasks.created_by = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (tasks t
     JOIN user_groups ug ON ((t.group_id = ug.group_id)))
  WHERE ((t.id = task_history.task_id) AND (ug.user_id = auth.uid())))))));


create policy "select_task_history_in_own_group"
on "public"."task_history"
as permissive
for select
to authenticated
using (((EXISTS ( SELECT 1
   FROM (tasks t
     JOIN user_groups ug ON ((t.group_id = ug.group_id)))
  WHERE ((t.id = task_history.task_id) AND (ug.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM tasks t
  WHERE ((t.id = task_history.task_id) AND (t.created_by = auth.uid()) AND (t.group_id IS NULL))))));


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



