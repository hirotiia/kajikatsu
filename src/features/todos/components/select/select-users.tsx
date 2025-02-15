import { FormSelect } from '@/components/ui/form';
import { GroupMember } from '@/lib/supabase/data/users/fetch-group-members';

type SelectUsersProps = {
  users: GroupMember[];
  id: string;
  name: string;
  label: string;
  required?: true | false;
};

export const SelectUsers = ({
  users,
  id,
  name,
  label,
  required = false,
}: SelectUsersProps) => {
  return (
    <FormSelect
      id={id}
      name={name}
      label={label}
      layout="vertical"
      className="mt-4"
      options={[
        { value: '', title: 'なし' },
        ...users.map((user) => ({
          value: user.user_id,
          title: user.username,
        })),
      ]}
      required={required}
    />
  );
};
