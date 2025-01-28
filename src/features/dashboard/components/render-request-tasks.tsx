import { InfoList } from '@/components/ui/list';

export const RenderRequestTasks = () => {
  return (
    <InfoList
      items={[
        {
          date: '2024/10/24',
          expireDate: '2024/11/01',
          title: '食器洗い',
          description: '誰かお願い',
        },
        {
          date: '2024/10/23',
          expireDate: '2024/11/02',
          title: '風呂洗い',
          description: '誰かお願い',
        },
        {
          date: '2024/10/21',
          expireDate: '2024/11/03',
          title: '洗濯物干し',
          description: '今日の午前中までにお願い',
        },
      ]}
    />
  );
};
