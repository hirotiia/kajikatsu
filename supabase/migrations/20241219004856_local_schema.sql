alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."tasks" add column "assignee_id" uuid;

alter table "public"."tasks" enable row level security;

alter table "public"."tasks" add constraint "tasks_assignee_id_fkey" FOREIGN KEY (assignee_id) REFERENCES auth.users(id) not valid;

alter table "public"."tasks" validate constraint "tasks_assignee_id_fkey";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

create policy "Enable insert for authenticated users only"
on "public"."tasks"
as permissive
for insert
to authenticated
with check (true);



