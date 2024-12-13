drop policy "Allow users to read their own data" on "public"."users";

alter table "public"."users" drop constraint "users_id_fkey1";

alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."user_groups" enable row level security;

alter table "public"."join_requests" add constraint "join_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."join_requests" validate constraint "join_requests_user_id_fkey";

alter table "public"."user_groups" add constraint "user_groups_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_groups" validate constraint "user_groups_user_id_fkey";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

create policy "Allow all users to update join_requests"
on "public"."join_requests"
as permissive
for update
to authenticated
using (true);


create policy "Enable read access for all users"
on "public"."join_requests"
as permissive
for select
to public
using (true);


create policy "Enabale update for authneticated users only"
on "public"."user_groups"
as permissive
for update
to public
using (true)
with check (true);


create policy "Enable insert for authenticated users only"
on "public"."user_groups"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."user_groups"
as permissive
for select
to public
using (true);


create policy "Allow read access to all users"
on "public"."users"
as permissive
for select
to public
using (true);



