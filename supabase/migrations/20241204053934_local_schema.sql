alter table "public"."group_invitations" drop constraint "group_invitations_created_by_fkey";

alter table "public"."user_groups" drop constraint "user_groups_user_id_fkey";

alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."group_invitations" alter column "expires_at" drop not null;

alter table "public"."group_invitations" alter column "invitation_token" set default encode(gen_random_bytes(16), 'hex'::text);

alter table "public"."group_invitations" alter column "invitation_token" set data type text using "invitation_token"::text;

alter table "public"."groups" enable row level security;

alter table "public"."roles" enable row level security;

alter table "public"."group_invitations" add constraint "group_invitations_created_by_fkey1" FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invitations" validate constraint "group_invitations_created_by_fkey1";

alter table "public"."user_groups" add constraint "user_groups_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_groups" validate constraint "user_groups_user_id_fkey1";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

create policy "Enable insert for authenticated users only"
on "public"."groups"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."groups"
as permissive
for select
to public
using (true);


create policy "Enable read access for all users"
on "public"."roles"
as permissive
for select
to public
using (true);



