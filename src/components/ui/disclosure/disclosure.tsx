import { ChevronDown } from 'lucide-react';
import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  TransitionEvent,
} from 'react';

import { Json } from '@/types/supabase/database.types';

type DisclosureProps = {
  id: string;
  avatar?: string;
  action: string;
  detail?: Json;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const Disclosure = ({
  id,
  avatar = '',
  action,
  detail,
  children,
  defaultOpen = false,
}: DisclosureProps) => {
  console.log(detail);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [maxHeight, setMaxHeight] = useState('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    if (isOpen) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight('0px');
    }
  }, [isOpen]);

  const handleSummaryClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (!detailsRef.current) return;

    if (!isOpen) {
      detailsRef.current.open = true;
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== contentRef.current) return;

    if (!isOpen && detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <details
      className="group overflow-hidden rounded border"
      id={id}
      ref={detailsRef}
      open={defaultOpen}
    >
      <summary
        onClick={handleSummaryClick}
        className="flex cursor-pointer list-none justify-between bg-base p-3 text-base-foreground"
      >
        <span>ディスクロージャー</span>
        <span className="ml-2 flex items-center">
          <ChevronDown
            className={`
              transition-transform duration-300 ease-out
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </span>
      </summary>

      <div
        ref={contentRef}
        style={{ maxHeight }}
        onTransitionEnd={handleTransitionEnd}
        className="
          overflow-hidden
          bg-base
          text-base-foreground
          transition-[max-height]
          duration-300
          ease-out
        "
      >
        <div className="p-3">
          {children}
          <p>id: {id}</p>
          <p>avatar: {avatar}</p>
          <p>action: {action}</p>
        </div>
      </div>
    </details>
  );
};
