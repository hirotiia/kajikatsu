'use client';

import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/';

export const ResetPassword = () => {
  return (
    <form
      action={() => {
        console.log('reset');
      }}
      className="mt-20 grid w-full gap-6"
    >
      <FormInput
        label="メールアドレス"
        id="mail"
        name="mail"
        type="email"
        className=""
        error={['メールアドレスが入力されていません']}
        required
      />
      <Button className="mx-auto max-w-screen-sm">メールを送信する</Button>
    </form>
  );
};
