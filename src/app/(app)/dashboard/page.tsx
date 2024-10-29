import { Content } from '@/components/layouts/content/content';
import { Box } from '@/components/ui/box/box';
import { SecondaryHeading } from '@/components/ui/heading';
import { InfoList } from '@/components/ui/list';

export default function Dashbord() {
  /** リダイレクト設定する */
  return (
    <>
      <Content>
        <SecondaryHeading>全体</SecondaryHeading>
        <SecondaryHeading className="mt-4">これお願い!</SecondaryHeading>
        <Box variant="secondary" className="mt-4">
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
        </Box>
        <SecondaryHeading className="mt-4">
          最近のアクティビティ
        </SecondaryHeading>
      </Content>
    </>
  );
}
