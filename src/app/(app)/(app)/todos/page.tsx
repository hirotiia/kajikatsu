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
import { FormInput, FormSelect, FormTextarea } from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';

export default function TodosPage() {
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
                  className=""
                  error="タイトルが入力されていません"
                  required
                />
                <FormTextarea
                  label="タスクの詳細"
                  id="title"
                  name="title"
                  className=""
                />
                <FormSelect
                  id="status"
                  name="status"
                  label="ステータス"
                  error="タスクのステータスを選択してください。"
                  layout="vertical"
                  options={[
                    { value: 'onHold', title: '保留' },
                    { value: 'pending', title: '未対応' },
                    { value: 'onGoing', title: '対応中' },
                    { value: 'completed', title: '完了' },
                  ]}
                />
                <Button>作成</Button>
              </form>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Content>
    </>
  );
}
