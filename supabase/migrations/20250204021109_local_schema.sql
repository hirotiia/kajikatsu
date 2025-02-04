drop trigger if exists "trg_log_task_update" on "public"."tasks";

alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."tasks" alter column "group_id" drop not null;

alter table "public"."tasks" alter column "status_id" drop not null;

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.log_task_changes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
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

    -- 2) UPDATE の場合
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.is_deleted = false AND NEW.is_deleted = true THEN
            /*
             * 「is_deleted」が false から true に変わったので、
             * deleted したとみなして 'deleted' アクション登録
             */
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
              (SELECT id FROM public.actions WHERE action_name = 'deleted'),
              NEW.updated_by,
              NOW(),
              json_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
            );
        ELSE
            /*
             * それ以外のUPDATEは、通常の更新 'updated' アクション登録
             */
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
              (SELECT id FROM public.actions WHERE action_name = 'updated'),
              NEW.updated_by,
              NOW(),
              json_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
            );
        END IF;
        RETURN NEW;

    -- 3) DELETE の場合 (※ 実際には呼ばれない前提)
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

create policy "Allow update on own tasks"
on "public"."tasks"
as permissive
for update
to public
using ((created_by = auth.uid()));


create policy "Enable read access for all users"
on "public"."tasks"
as permissive
for select
to public
using (true);


CREATE TRIGGER trg_log_task_delete AFTER DELETE ON public.tasks FOR EACH ROW EXECUTE FUNCTION log_task_changes();

CREATE TRIGGER trg_log_task_insert AFTER INSERT ON public.tasks FOR EACH ROW EXECUTE FUNCTION log_task_changes();

CREATE TRIGGER trg_log_task_update AFTER UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION log_task_changes();


