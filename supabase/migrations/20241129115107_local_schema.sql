create policy "Allow users to read their own data"
on "public"."users"
as permissive
for select
to public
using ((auth.uid() = id));


create policy "Allow users to update their own data"
on "public"."users"
as permissive
for update
to public
using ((auth.uid() = id));



