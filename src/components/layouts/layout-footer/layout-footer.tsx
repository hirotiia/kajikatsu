import { Text } from '@/components/ui/text';

export const LayoutFooter = ({ className }: { className: string }) => {
  return (
    <footer className={className}>
      <Text spacing="none" className="text-right">
        <small>©2024 nakano hiroya</small>
      </Text>
    </footer>
  );
};
