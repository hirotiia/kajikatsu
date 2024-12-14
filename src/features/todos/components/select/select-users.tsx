import { FormSelect } from '@/components/ui/form';

export const SelectUsers = () => {
  return (
    <FormSelect
      id="status"
      name="status"
      label="ステータス"
      error="タスクのステータスを選択してください。"
      layout="vertical"
      className="mt-4"
      options={[
        { value: 'onHold', title: '保留' },
        { value: 'pending', title: '未対応' },
        { value: 'onGoing', title: '対応中' },
        { value: 'completed', title: '完了' },
      ]}
    />
  );
};
