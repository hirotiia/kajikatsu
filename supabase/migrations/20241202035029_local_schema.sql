create table "public"."actions" (
    "id" uuid not null default uuid_generate_v4(),
    "action_name" character varying(50) not null,
    "description" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."group_invitations" (
    "id" uuid not null default uuid_generate_v4(),
    "group_id" uuid not null,
    "invitation_token" character varying(255) not null,
    "expires_at" timestamp without time zone not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "created_by" uuid not null
);


create table "public"."groups" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(100) not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."join_requests" (
    "id" uuid not null default uuid_generate_v4(),
    "invitation_id" uuid not null,
    "user_id" uuid not null,
    "requested_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "status" character varying(20) not null,
    "processed_at" timestamp without time zone,
    "processed_by" uuid
);


create table "public"."permissions" (
    "id" uuid not null default uuid_generate_v4(),
    "action" character varying(50) not null,
    "description" text
);


create table "public"."role_permissions" (
    "role_id" uuid not null,
    "permission_id" uuid not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."roles" (
    "id" uuid not null default uuid_generate_v4(),
    "name" character varying(50) not null,
    "description" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP
);


create table "public"."statuses" (
    "id" uuid not null default uuid_generate_v4(),
    "status_name" character varying(50) not null
);


create table "public"."task_history" (
    "id" uuid not null default uuid_generate_v4(),
    "task_id" uuid not null,
    "action_id" uuid not null,
    "changed_by" uuid not null,
    "changed_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "details" json
);


create table "public"."tasks" (
    "id" uuid not null default uuid_generate_v4(),
    "group_id" uuid not null,
    "title" character varying(255) not null,
    "description" text,
    "status_id" uuid not null,
    "is_deleted" boolean not null default false,
    "created_by" uuid not null,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_by" uuid not null,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "expires_at" timestamp without time zone
);


create table "public"."user_groups" (
    "group_id" uuid not null,
    "user_id" uuid not null,
    "role_id" uuid not null,
    "joined_at" timestamp without time zone not null default CURRENT_TIMESTAMP
);


alter table "public"."users" alter column "username" set data type character varying(50) using "username"::character varying(50);

CREATE UNIQUE INDEX actions_action_name_key ON public.actions USING btree (action_name);

CREATE UNIQUE INDEX actions_pkey ON public.actions USING btree (id);

CREATE UNIQUE INDEX group_invitations_invitation_token_key ON public.group_invitations USING btree (invitation_token);

CREATE UNIQUE INDEX group_invitations_pkey ON public.group_invitations USING btree (id);

CREATE UNIQUE INDEX groups_pkey ON public.groups USING btree (id);

CREATE INDEX idx_group_invitations_expires_at ON public.group_invitations USING btree (expires_at);

CREATE INDEX idx_group_invitations_group_id ON public.group_invitations USING btree (group_id);

CREATE INDEX idx_tasks_created_by ON public.tasks USING btree (created_by);

CREATE INDEX idx_tasks_group_id ON public.tasks USING btree (group_id);

CREATE INDEX idx_tasks_status_id ON public.tasks USING btree (status_id);

CREATE INDEX idx_tasks_updated_by ON public.tasks USING btree (updated_by);

CREATE INDEX idx_user_groups_role_id ON public.user_groups USING btree (role_id);

CREATE UNIQUE INDEX join_requests_pkey ON public.join_requests USING btree (id);

CREATE UNIQUE INDEX permissions_action_key ON public.permissions USING btree (action);

CREATE UNIQUE INDEX permissions_pkey ON public.permissions USING btree (id);

CREATE UNIQUE INDEX role_permissions_pkey ON public.role_permissions USING btree (role_id, permission_id);

CREATE UNIQUE INDEX roles_name_key ON public.roles USING btree (name);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX statuses_pkey ON public.statuses USING btree (id);

CREATE UNIQUE INDEX statuses_status_name_key ON public.statuses USING btree (status_name);

CREATE UNIQUE INDEX task_history_pkey ON public.task_history USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

CREATE UNIQUE INDEX user_groups_pkey ON public.user_groups USING btree (group_id, user_id);

alter table "public"."actions" add constraint "actions_pkey" PRIMARY KEY using index "actions_pkey";

alter table "public"."group_invitations" add constraint "group_invitations_pkey" PRIMARY KEY using index "group_invitations_pkey";

alter table "public"."groups" add constraint "groups_pkey" PRIMARY KEY using index "groups_pkey";

alter table "public"."join_requests" add constraint "join_requests_pkey" PRIMARY KEY using index "join_requests_pkey";

alter table "public"."permissions" add constraint "permissions_pkey" PRIMARY KEY using index "permissions_pkey";

alter table "public"."role_permissions" add constraint "role_permissions_pkey" PRIMARY KEY using index "role_permissions_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."statuses" add constraint "statuses_pkey" PRIMARY KEY using index "statuses_pkey";

alter table "public"."task_history" add constraint "task_history_pkey" PRIMARY KEY using index "task_history_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."user_groups" add constraint "user_groups_pkey" PRIMARY KEY using index "user_groups_pkey";

alter table "public"."actions" add constraint "actions_action_name_key" UNIQUE using index "actions_action_name_key";

alter table "public"."group_invitations" add constraint "group_invitations_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT not valid;

alter table "public"."group_invitations" validate constraint "group_invitations_created_by_fkey";

alter table "public"."group_invitations" add constraint "group_invitations_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."group_invitations" validate constraint "group_invitations_group_id_fkey";

alter table "public"."group_invitations" add constraint "group_invitations_invitation_token_key" UNIQUE using index "group_invitations_invitation_token_key";

alter table "public"."join_requests" add constraint "join_requests_invitation_id_fkey" FOREIGN KEY (invitation_id) REFERENCES group_invitations(id) ON DELETE CASCADE not valid;

alter table "public"."join_requests" validate constraint "join_requests_invitation_id_fkey";

alter table "public"."join_requests" add constraint "join_requests_processed_by_fkey" FOREIGN KEY (processed_by) REFERENCES users(id) ON DELETE SET NULL not valid;

alter table "public"."join_requests" validate constraint "join_requests_processed_by_fkey";

alter table "public"."join_requests" add constraint "join_requests_status_check" CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'approved'::character varying, 'rejected'::character varying])::text[]))) not valid;

alter table "public"."join_requests" validate constraint "join_requests_status_check";

alter table "public"."join_requests" add constraint "join_requests_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."join_requests" validate constraint "join_requests_user_id_fkey";

alter table "public"."permissions" add constraint "permissions_action_key" UNIQUE using index "permissions_action_key";

alter table "public"."role_permissions" add constraint "role_permissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_permission_id_fkey";

alter table "public"."role_permissions" add constraint "role_permissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."role_permissions" validate constraint "role_permissions_role_id_fkey";

alter table "public"."roles" add constraint "roles_name_key" UNIQUE using index "roles_name_key";

alter table "public"."statuses" add constraint "statuses_status_name_key" UNIQUE using index "statuses_status_name_key";

alter table "public"."task_history" add constraint "task_history_action_id_fkey" FOREIGN KEY (action_id) REFERENCES actions(id) ON DELETE RESTRICT not valid;

alter table "public"."task_history" validate constraint "task_history_action_id_fkey";

alter table "public"."task_history" add constraint "task_history_changed_by_fkey" FOREIGN KEY (changed_by) REFERENCES users(id) ON DELETE RESTRICT not valid;

alter table "public"."task_history" validate constraint "task_history_changed_by_fkey";

alter table "public"."task_history" add constraint "task_history_task_id_fkey" FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE not valid;

alter table "public"."task_history" validate constraint "task_history_task_id_fkey";

alter table "public"."tasks" add constraint "tasks_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT not valid;

alter table "public"."tasks" validate constraint "tasks_created_by_fkey";

alter table "public"."tasks" add constraint "tasks_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_group_id_fkey";

alter table "public"."tasks" add constraint "tasks_status_id_fkey" FOREIGN KEY (status_id) REFERENCES statuses(id) ON DELETE RESTRICT not valid;

alter table "public"."tasks" validate constraint "tasks_status_id_fkey";

alter table "public"."tasks" add constraint "tasks_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE RESTRICT not valid;

alter table "public"."tasks" validate constraint "tasks_updated_by_fkey";

alter table "public"."user_groups" add constraint "user_groups_group_id_fkey" FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE not valid;

alter table "public"."user_groups" validate constraint "user_groups_group_id_fkey";

alter table "public"."user_groups" add constraint "user_groups_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT not valid;

alter table "public"."user_groups" validate constraint "user_groups_role_id_fkey";

alter table "public"."user_groups" add constraint "user_groups_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."user_groups" validate constraint "user_groups_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.log_task_update()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
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
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_roles_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_tasks_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."actions" to "anon";

grant insert on table "public"."actions" to "anon";

grant references on table "public"."actions" to "anon";

grant select on table "public"."actions" to "anon";

grant trigger on table "public"."actions" to "anon";

grant truncate on table "public"."actions" to "anon";

grant update on table "public"."actions" to "anon";

grant delete on table "public"."actions" to "authenticated";

grant insert on table "public"."actions" to "authenticated";

grant references on table "public"."actions" to "authenticated";

grant select on table "public"."actions" to "authenticated";

grant trigger on table "public"."actions" to "authenticated";

grant truncate on table "public"."actions" to "authenticated";

grant update on table "public"."actions" to "authenticated";

grant delete on table "public"."actions" to "service_role";

grant insert on table "public"."actions" to "service_role";

grant references on table "public"."actions" to "service_role";

grant select on table "public"."actions" to "service_role";

grant trigger on table "public"."actions" to "service_role";

grant truncate on table "public"."actions" to "service_role";

grant update on table "public"."actions" to "service_role";

grant delete on table "public"."group_invitations" to "anon";

grant insert on table "public"."group_invitations" to "anon";

grant references on table "public"."group_invitations" to "anon";

grant select on table "public"."group_invitations" to "anon";

grant trigger on table "public"."group_invitations" to "anon";

grant truncate on table "public"."group_invitations" to "anon";

grant update on table "public"."group_invitations" to "anon";

grant delete on table "public"."group_invitations" to "authenticated";

grant insert on table "public"."group_invitations" to "authenticated";

grant references on table "public"."group_invitations" to "authenticated";

grant select on table "public"."group_invitations" to "authenticated";

grant trigger on table "public"."group_invitations" to "authenticated";

grant truncate on table "public"."group_invitations" to "authenticated";

grant update on table "public"."group_invitations" to "authenticated";

grant delete on table "public"."group_invitations" to "service_role";

grant insert on table "public"."group_invitations" to "service_role";

grant references on table "public"."group_invitations" to "service_role";

grant select on table "public"."group_invitations" to "service_role";

grant trigger on table "public"."group_invitations" to "service_role";

grant truncate on table "public"."group_invitations" to "service_role";

grant update on table "public"."group_invitations" to "service_role";

grant delete on table "public"."groups" to "anon";

grant insert on table "public"."groups" to "anon";

grant references on table "public"."groups" to "anon";

grant select on table "public"."groups" to "anon";

grant trigger on table "public"."groups" to "anon";

grant truncate on table "public"."groups" to "anon";

grant update on table "public"."groups" to "anon";

grant delete on table "public"."groups" to "authenticated";

grant insert on table "public"."groups" to "authenticated";

grant references on table "public"."groups" to "authenticated";

grant select on table "public"."groups" to "authenticated";

grant trigger on table "public"."groups" to "authenticated";

grant truncate on table "public"."groups" to "authenticated";

grant update on table "public"."groups" to "authenticated";

grant delete on table "public"."groups" to "service_role";

grant insert on table "public"."groups" to "service_role";

grant references on table "public"."groups" to "service_role";

grant select on table "public"."groups" to "service_role";

grant trigger on table "public"."groups" to "service_role";

grant truncate on table "public"."groups" to "service_role";

grant update on table "public"."groups" to "service_role";

grant delete on table "public"."join_requests" to "anon";

grant insert on table "public"."join_requests" to "anon";

grant references on table "public"."join_requests" to "anon";

grant select on table "public"."join_requests" to "anon";

grant trigger on table "public"."join_requests" to "anon";

grant truncate on table "public"."join_requests" to "anon";

grant update on table "public"."join_requests" to "anon";

grant delete on table "public"."join_requests" to "authenticated";

grant insert on table "public"."join_requests" to "authenticated";

grant references on table "public"."join_requests" to "authenticated";

grant select on table "public"."join_requests" to "authenticated";

grant trigger on table "public"."join_requests" to "authenticated";

grant truncate on table "public"."join_requests" to "authenticated";

grant update on table "public"."join_requests" to "authenticated";

grant delete on table "public"."join_requests" to "service_role";

grant insert on table "public"."join_requests" to "service_role";

grant references on table "public"."join_requests" to "service_role";

grant select on table "public"."join_requests" to "service_role";

grant trigger on table "public"."join_requests" to "service_role";

grant truncate on table "public"."join_requests" to "service_role";

grant update on table "public"."join_requests" to "service_role";

grant delete on table "public"."permissions" to "anon";

grant insert on table "public"."permissions" to "anon";

grant references on table "public"."permissions" to "anon";

grant select on table "public"."permissions" to "anon";

grant trigger on table "public"."permissions" to "anon";

grant truncate on table "public"."permissions" to "anon";

grant update on table "public"."permissions" to "anon";

grant delete on table "public"."permissions" to "authenticated";

grant insert on table "public"."permissions" to "authenticated";

grant references on table "public"."permissions" to "authenticated";

grant select on table "public"."permissions" to "authenticated";

grant trigger on table "public"."permissions" to "authenticated";

grant truncate on table "public"."permissions" to "authenticated";

grant update on table "public"."permissions" to "authenticated";

grant delete on table "public"."permissions" to "service_role";

grant insert on table "public"."permissions" to "service_role";

grant references on table "public"."permissions" to "service_role";

grant select on table "public"."permissions" to "service_role";

grant trigger on table "public"."permissions" to "service_role";

grant truncate on table "public"."permissions" to "service_role";

grant update on table "public"."permissions" to "service_role";

grant delete on table "public"."role_permissions" to "anon";

grant insert on table "public"."role_permissions" to "anon";

grant references on table "public"."role_permissions" to "anon";

grant select on table "public"."role_permissions" to "anon";

grant trigger on table "public"."role_permissions" to "anon";

grant truncate on table "public"."role_permissions" to "anon";

grant update on table "public"."role_permissions" to "anon";

grant delete on table "public"."role_permissions" to "authenticated";

grant insert on table "public"."role_permissions" to "authenticated";

grant references on table "public"."role_permissions" to "authenticated";

grant select on table "public"."role_permissions" to "authenticated";

grant trigger on table "public"."role_permissions" to "authenticated";

grant truncate on table "public"."role_permissions" to "authenticated";

grant update on table "public"."role_permissions" to "authenticated";

grant delete on table "public"."role_permissions" to "service_role";

grant insert on table "public"."role_permissions" to "service_role";

grant references on table "public"."role_permissions" to "service_role";

grant select on table "public"."role_permissions" to "service_role";

grant trigger on table "public"."role_permissions" to "service_role";

grant truncate on table "public"."role_permissions" to "service_role";

grant update on table "public"."role_permissions" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."statuses" to "anon";

grant insert on table "public"."statuses" to "anon";

grant references on table "public"."statuses" to "anon";

grant select on table "public"."statuses" to "anon";

grant trigger on table "public"."statuses" to "anon";

grant truncate on table "public"."statuses" to "anon";

grant update on table "public"."statuses" to "anon";

grant delete on table "public"."statuses" to "authenticated";

grant insert on table "public"."statuses" to "authenticated";

grant references on table "public"."statuses" to "authenticated";

grant select on table "public"."statuses" to "authenticated";

grant trigger on table "public"."statuses" to "authenticated";

grant truncate on table "public"."statuses" to "authenticated";

grant update on table "public"."statuses" to "authenticated";

grant delete on table "public"."statuses" to "service_role";

grant insert on table "public"."statuses" to "service_role";

grant references on table "public"."statuses" to "service_role";

grant select on table "public"."statuses" to "service_role";

grant trigger on table "public"."statuses" to "service_role";

grant truncate on table "public"."statuses" to "service_role";

grant update on table "public"."statuses" to "service_role";

grant delete on table "public"."task_history" to "anon";

grant insert on table "public"."task_history" to "anon";

grant references on table "public"."task_history" to "anon";

grant select on table "public"."task_history" to "anon";

grant trigger on table "public"."task_history" to "anon";

grant truncate on table "public"."task_history" to "anon";

grant update on table "public"."task_history" to "anon";

grant delete on table "public"."task_history" to "authenticated";

grant insert on table "public"."task_history" to "authenticated";

grant references on table "public"."task_history" to "authenticated";

grant select on table "public"."task_history" to "authenticated";

grant trigger on table "public"."task_history" to "authenticated";

grant truncate on table "public"."task_history" to "authenticated";

grant update on table "public"."task_history" to "authenticated";

grant delete on table "public"."task_history" to "service_role";

grant insert on table "public"."task_history" to "service_role";

grant references on table "public"."task_history" to "service_role";

grant select on table "public"."task_history" to "service_role";

grant trigger on table "public"."task_history" to "service_role";

grant truncate on table "public"."task_history" to "service_role";

grant update on table "public"."task_history" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

grant delete on table "public"."user_groups" to "anon";

grant insert on table "public"."user_groups" to "anon";

grant references on table "public"."user_groups" to "anon";

grant select on table "public"."user_groups" to "anon";

grant trigger on table "public"."user_groups" to "anon";

grant truncate on table "public"."user_groups" to "anon";

grant update on table "public"."user_groups" to "anon";

grant delete on table "public"."user_groups" to "authenticated";

grant insert on table "public"."user_groups" to "authenticated";

grant references on table "public"."user_groups" to "authenticated";

grant select on table "public"."user_groups" to "authenticated";

grant trigger on table "public"."user_groups" to "authenticated";

grant truncate on table "public"."user_groups" to "authenticated";

grant update on table "public"."user_groups" to "authenticated";

grant delete on table "public"."user_groups" to "service_role";

grant insert on table "public"."user_groups" to "service_role";

grant references on table "public"."user_groups" to "service_role";

grant select on table "public"."user_groups" to "service_role";

grant trigger on table "public"."user_groups" to "service_role";

grant truncate on table "public"."user_groups" to "service_role";

grant update on table "public"."user_groups" to "service_role";

CREATE TRIGGER trg_update_groups_updated_at BEFORE UPDATE ON public.groups FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_update_roles_updated_at BEFORE UPDATE ON public.roles FOR EACH ROW EXECUTE FUNCTION update_roles_updated_at();

CREATE TRIGGER trg_log_task_update BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION log_task_update();

CREATE TRIGGER trg_update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_tasks_updated_at();


