import { ChevronDown } from 'lucide-react';
import React, { useRef, useState } from 'react';

import { Json } from '@/types/supabase/database.types';
import { cn } from '@/utils/cn';

type DisclosureProps = {
  id: string;
  avatar?: string;
  action: string;
  detail?: Json;
  children: React.ReactNode;
};

export const Disclosure = ({
  id,
  avatar = '',
  action,
  detail,
  children,
}: DisclosureProps) => {
  console.log(detail);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDisclosure = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <details className="group" open={isOpen} onToggle={toggleDisclosure}>
        <summary className="flex justify-between border-1 bg-base p-3 text-base-foreground">
          ディスクロージャー
          <span className="ml-2">
            <ChevronDown className="rotate-0 transition-transform duration-300 ease-out group-open:rotate-180" />
          </span>
        </summary>
        <div
          ref={contentRef}
          className={cn(
            'overflow-hidden transition-[max-height] ease-out duration-300 bg-base text-base-foreground',
            isOpen
              ? `max-h-[${contentRef.current?.scrollHeight}px]`
              : 'max-h-0',
          )}
        >
          <div className="p-3">
            {children}
            <p>id: {id}</p>
            <p>avatar: {avatar}</p>
            <p>action: {action}</p>
          </div>
        </div>
      </details>
    </>
  );
};
