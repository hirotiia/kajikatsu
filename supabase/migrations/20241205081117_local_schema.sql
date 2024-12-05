alter table "public"."join_requests" drop constraint "join_requests_status_check";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

create policy "Allow all users to delete groups"
on "public"."groups"
as permissive
for delete
to public
using (true);



