import { X } from 'lucide-react';

import { Content } from '@/components/layouts/content/content';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerTitle,
  DrawerBody,
} from '@/components/ui/drawer';
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormDatePicker,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { SelectUsers } from '@/features/todos/components/select/select-users';
import { getGroupData } from '@/lib/supabase/data/get-group-data';
import { getUser } from '@/lib/supabase/user/user';

export default async function TodosPage() {
  const { user, authError } = await getUser();

  if (authError || !user) {
    return (
      <Content bg="secondary">
        <Heading as="h1">認証エラー</Heading>
        <p>ユーザー情報を取得できませんでした。</p>
      </Content>
    );
  }

  let groupInfo;
  try {
    groupInfo = await getGroupData(user.id);
  } catch (error) {
    console.error(error);
    return (
      <Content bg="secondary">
        <Heading as="h1">エラー</Heading>
        <p>グループ情報の取得に失敗しました。</p>
      </Content>
    );
  }
  return (
    <>
      <Content bg="secondary">
        <Heading as="h1">やることリスト</Heading>

        <Drawer name="create_task">
          <DrawerTrigger className="flex h-10 w-12 items-center justify-center">
            タスクを作成する
          </DrawerTrigger>
          <DrawerContent className="px-4 pt-10">
            <DrawerCloseTrigger className="text-right">
              <X size="20">close</X>
            </DrawerCloseTrigger>
            <DrawerTitle className="mt-10">新しいタスクを作成</DrawerTitle>
            <DrawerBody>
              <form action="">
                <FormInput
                  label="タイトル"
                  id="title"
                  name="title"
                  type="text"
                  layout="vertical"
                  className=""
                  error="タイトルが入力されていません"
                  required
                />
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
                <FormTextarea
                  label="タスクの詳細"
                  id="title"
                  name="title"
                  layout="vertical"
                  className="mt-4"
                />
                <SelectUsers users={groupInfo.group_members} />
                <FormDatePicker
                  id="deadline"
                  name="deadline"
                  label="タスクの期限日"
                  placeholder="期限日を選択"
                  layout="vertical"
                  className="mt-4"
                />

                <Button className="mt-10" size="full">
                  作成
                </Button>
              </form>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Content>
    </>
  );
}
