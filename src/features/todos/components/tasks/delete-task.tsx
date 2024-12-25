import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const DeleteTask = () => {
  return (
    <Button
      className="rounded-md"
      variant="destructive"
      size="small"
      icon={<Trash2>削除する</Trash2>}
    >
      削除する
    </Button>
  );
};
