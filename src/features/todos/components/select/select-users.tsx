import { FormSelect } from '@/components/ui/form';
import { GroupMember } from '@/lib/supabase/data/get-group-data';

type SelectUsersProps = {
  users: GroupMember[];
};

export const SelectUsers = ({ users }: SelectUsersProps) => {
  return (
    <FormSelect
      id="assignment"
      name="assignment"
      label="担当者"
      layout="vertical"
      className="mt-4"
      options={[
        { value: '', title: 'なし' },
        ...users.map((user) => ({
          value: user.user_id,
          title: user.username,
        })),
      ]}
    />
  );
};
