import { LinkListItem } from '@/components/ui/list';

type YearMonth = {
  year: number;
  month: number;
};
export async function fetchTaskHistoryByYearMonth({
  year,
  month,
}: YearMonth): Promise<LinkListItem[]> {
  console.log(year, month);

  return [
    {
      key: 'ダミー',
      avatarUrl: 'dummy',
      updatedAt: 'dummy',
      title: 'dummy',
      link: 'dummy',
    },
  ];
}
