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
        type="button"
        onClick={handleGoogleLogin}
        icon={<GoogleIcon />}
        variant="login"
        rounded="md"
      >
        Googleでログイン
      </Button>
      <Button type="button" icon={<XIcon />} variant="login" rounded="md">
        Xでログイン
      </Button>
    </div>
  );
}
