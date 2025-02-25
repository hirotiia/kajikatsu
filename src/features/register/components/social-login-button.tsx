import { Button } from '@/components/ui/button';

type SocialLoginButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  [key: string]: any;
};

export function SocialLoginButton({
  children,
  icon,
  ...rest
}: SocialLoginButtonProps) {
  return (
    <Button {...rest}>
      {icon}
      {children}
    </Button>
  );
}
