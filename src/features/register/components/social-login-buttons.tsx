import { GoogleIcon, XIcon } from '@/components/ui/icon';

import { SocialLoginButton } from './social-login-button';

export function SocialLoginButtons() {
  return (
    <form action="" className="mt-8 grid w-full max-w-screen-sm gap-5">
      <SocialLoginButton icon={<GoogleIcon />} variant="login" rounded="md">
        Googleでログイン
      </SocialLoginButton>
      <SocialLoginButton icon={<XIcon />} variant="login" rounded="md">
        Xでログイン
      </SocialLoginButton>
    </form>
  );
}
