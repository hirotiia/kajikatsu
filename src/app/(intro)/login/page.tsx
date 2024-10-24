import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { config } from '@/config/config';
import { currentUser } from '@/utils/auth';

export default async function Login() {
  const user = await currentUser();

  if (user) {
    redirect('/dashbord');
  }

  return (
    <>
      <hgroup className="mb-14 flex flex-col-reverse items-center justify-center gap-4 md:mb-24 md:gap-6">
        <h1 className="text-4xl md:text-6xl">ログイン</h1>
        <p className="text-xl md:text-2xl">
          ~{config.APP_NAME}で家事の負荷を分散しよう~
        </p>
      </hgroup>

      <div className="mt-10 grid place-items-center gap-4">
        <Button
          rounded="md"
          variant="login"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 45 45"
              className="size-8"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
          }
        >
          Googleでログイン
        </Button>
        <Button
          rounded="md"
          variant="login"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 1227"
              className="size-6 fill-current"
            >
              <path
                d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                fill="currentColor"
              />
            </svg>
          }
        >
          Xでログイン
        </Button>
      </div>
    </>
  );
}
