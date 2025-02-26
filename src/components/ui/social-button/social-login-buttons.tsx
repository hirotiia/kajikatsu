import { GoogleIcon, XIcon } from '@/components/ui/icon';
import { signInWithGoogle } from '@/lib/supabase/auth/sign-in-with-google';

import { SocialLoginButton } from './social-login-button';

export function SocialLoginButtons() {
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };
  return (
    <form action="" className="mt-8 grid w-full max-w-screen-sm gap-5">
      <SocialLoginButton
        onClick={handleGoogleLogin}
        icon={<GoogleIcon />}
        variant="login"
        rounded="md"
      >
        Googleでログイン
      </SocialLoginButton>
      <SocialLoginButton icon={<XIcon />} variant="login" rounded="md">
        Xでログイン
      </SocialLoginButton>
    </form>
  );
}
