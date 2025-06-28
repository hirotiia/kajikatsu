'use client';

import { GoogleIcon, XIcon } from '@/components/ui/icon';
import { signInWithGoogle } from '@/lib/supabase/auth/sign-in-with-google';

import { Button } from '../button';

export function SocialLoginButtons() {
  const handleGoogleLogin = async () => {
    await signInWithGoogle();
  };
  return (
    <div className="mt-8 grid w-full max-w-screen-sm gap-5">
      <Button
        as="button"
        type="button"
        onClick={handleGoogleLogin}
        icon={<GoogleIcon />}
        variant="login"
        rounded="sm"
        className="items-center"
      >
        Googleでログイン
      </Button>
      <Button
        as="button"
        type="button"
        icon={<XIcon />}
        variant="login"
        rounded="sm"
      >
        Xでログイン
      </Button>
    </div>
  );
}
