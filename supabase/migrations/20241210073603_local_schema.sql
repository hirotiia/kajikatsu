alter table "public"."join_requests" drop constraint "join_requests_processed_by_fkey";

alter table "public"."join_requests" drop constraint "join_requests_user_id_fkey";

alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."group_invitations" enable row level security;

alter table "public"."join_requests" enable row level security;

alter table "public"."join_requests" add constraint "join_requests_processed_by_fkey1" FOREIGN KEY (processed_by) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."join_requests" validate constraint "join_requests_processed_by_fkey1";

alter table "public"."join_requests" add constraint "join_requests_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."join_requests" validate constraint "join_requests_user_id_fkey1";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

create policy "Enable insert for authenticated users only"
on "public"."group_invitations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."group_invitations"
as permissive
for select
to public
using (true);


create policy "allow_update_on_group_invitations"
on "public"."group_invitations"
as permissive
for update
to public
using ((created_by = auth.uid()))
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."join_requests"
as permissive
for insert
to authenticated
with check (true);



