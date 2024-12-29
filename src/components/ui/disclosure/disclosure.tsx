import { Minus, Plus } from 'lucide-react';

import { Json } from '@/types/supabase/database.types';

type DisclosureProps = {
  id: string;
  avatar?: string;
  action: string;
  detail?: Json;
};

export const Disclosure = ({
  id,
  avatar = '',
  action,
  detail,
}: DisclosureProps) => {
  console.log(detail);
  return (
    <>
      <details className="group">
        <summary className="flex justify-between">
          ディスクロージャー
          <Plus className="block group-open:hidden">開く</Plus>
          <Minus className="hidden group-open:block">開く</Minus>
        </summary>
        <p>id: {id}</p>
        <p>avatar: {avatar}</p>
        <p>action: {action}</p>
      </details>
    </>
  );
};
