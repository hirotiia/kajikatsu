export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      actions: {
        Row: {
          action_name: 'updated' | 'completed' | 'created' | 'deleted';
          created_at: string | null;
          description: string | null;
          id: string;
        };
        Insert: {
          action_name: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
        };
        Update: {
          action_name?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      group_invitations: {
        Row: {
          created_at: string | null;
          created_by: string;
          expires_at: string | null;
          group_id: string;
          id: string;
          invitation_token: string;
        };
        Insert: {
          created_at?: string | null;
          created_by: string;
          expires_at?: string | null;
          group_id: string;
          id?: string;
          invitation_token?: string;
        };
        Update: {
          created_at?: string | null;
          created_by?: string;
          expires_at?: string | null;
          group_id?: string;
          id?: string;
          invitation_token?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'group_invitations_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      join_requests: {
        Row: {
          id: string;
          invitation_id: string;
          processed_at: string | null;
          processed_by: string | null;
          requested_at: string | null;
          status: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          invitation_id: string;
          processed_at?: string | null;
          processed_by?: string | null;
          requested_at?: string | null;
          status: string;
          user_id: string;
        };
        Update: {
          id?: string;
          invitation_id?: string;
          processed_at?: string | null;
          processed_by?: string | null;
          requested_at?: string | null;
          status?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'join_requests_invitation_id_fkey';
            columns: ['invitation_id'];
            isOneToOne: false;
            referencedRelation: 'group_invitations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'join_requests_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      permissions: {
        Row: {
          action: string;
          description: string | null;
          id: string;
        };
        Insert: {
          action: string;
          description?: string | null;
          id?: string;
        };
        Update: {
          action?: string;
          description?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      role_permissions: {
        Row: {
          created_at: string | null;
          permission_id: string;
          role_id: string;
        };
        Insert: {
          created_at?: string | null;
          permission_id: string;
          role_id: string;
        };
        Update: {
          created_at?: string | null;
          permission_id?: string;
          role_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'role_permissions_permission_id_fkey';
            columns: ['permission_id'];
            isOneToOne: false;
            referencedRelation: 'permissions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'role_permissions_role_id_fkey';
            columns: ['role_id'];
            isOneToOne: false;
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          },
        ];
      };
      roles: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      statuses: {
        Row: {
          id: string;
          status_name: string;
          sort_order: number;
        };
        Insert: {
          id?: string;
          status_name: string;
          sort_order: number;
        };
        Update: {
          id?: string;
          status_name?: string;
          sort_order: number;
        };
        Relationships: [];
      };
      task_history: {
        Row: {
          action_id: string;
          changed_at: string | null;
          changed_by: string;
          details: { old: Json | null; new: Json | null };
          id: string;
          task_id: string;
        };
        Insert: {
          action_id: string;
          changed_at?: string | null;
          changed_by: string;
          details?: { old: Json | null; new: Json | null };
          id?: string;
          task_id: string;
        };
        Update: {
          action_id?: string;
          changed_at?: string | null;
          changed_by?: string;
          details?: { old: Json | null; new: Json | null };
          id?: string;
          task_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'task_history_action_id_fkey';
            columns: ['action_id'];
            isOneToOne: false;
            referencedRelation: 'actions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_history_changed_by_fkey';
            columns: ['changed_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'task_history_task_id_fkey';
            columns: ['task_id'];
            isOneToOne: false;
            referencedRelation: 'tasks';
            referencedColumns: ['id'];
          },
        ];
      };
      tasks: {
        Row: {
          assignee_id: string | null;
          created_at: string | null;
          created_by: string;
          description: string | null;
          expires_at: string | null;
          group_id: string | null;
          id: string;
          is_deleted: boolean;
          status_id: string;
          title: string;
          updated_at: string | null;
          updated_by: string;
        };
        Insert: {
          assignee_id?: string | null;
          created_at?: string | null;
          created_by: string;
          description?: string | null;
          expires_at?: string | null;
          group_id: string | null;
          id?: string;
          is_deleted?: boolean;
          status_id: string;
          title: string;
          updated_at?: string | null;
          updated_by: string;
        };
        Update: {
          assignee_id?: string | null;
          created_at?: string | null;
          created_by?: string;
          description?: string | null;
          expires_at?: string | null;
          group_id?: string | null;
          id?: string;
          is_deleted?: boolean;
          status_id?: string | null;
          title?: string;
          updated_at?: string | null;
          updated_by?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'tasks_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tasks_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tasks_status_id_fkey';
            columns: ['status_id'];
            isOneToOne: false;
            referencedRelation: 'statuses';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'tasks_updated_by_fkey';
            columns: ['updated_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      user_groups: {
        Row: {
          group_id: string;
          joined_at: string;
          role_id: string;
          user_id: string;
        };
        Insert: {
          group_id: string;
          joined_at?: string;
          role_id: string;
          user_id: string;
        };
        Update: {
          group_id?: string;
          joined_at?: string;
          role_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_groups_group_id_fkey';
            columns: ['group_id'];
            isOneToOne: false;
            referencedRelation: 'groups';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_groups_role_id_fkey';
            columns: ['role_id'];
            isOneToOne: false;
            referencedRelation: 'roles';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_groups_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          id: string;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          id: string;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          id?: string;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      custom_access_token_hook: {
        Args: {
          event: Json;
        };
        Returns: Json;
      };
      get_task_history_by_month: {
        Args: {
          p_year: number;
          p_month: number;
        };
        Returns: {
          history_id: string;
          changed_by_name: string;
          changed_by_avatar_url: string;
          changed_at: string;
          action_description: string;
        }[];
      };
      get_user_profile: {
        Args: Record<string, never>;
        Returns: {
          userId: string;
          username: string;
          avatar_url: string | null;
          group: {
            id: string;
            name: string;
            role: {
              id: string;
              name: 'viewer' | 'editor' | 'admin' | 'owner';
            };
          } | null;
        };
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export type FunctionReturn<T extends keyof Database['public']['Functions']> =
  Database['public']['Functions'][T]['Returns'];
