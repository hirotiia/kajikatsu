'use client';

import { ChevronDown, CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  TransitionEvent,
} from 'react';

type IconType = string | React.ReactElement;

type DisclosureProps = {
  id: string;
  icon?: IconType;
  overview: string;
  detail: string | React.JSX.Element;
  defaultOpen?: boolean;
};

// TODO: サイト内検索で合致した場合に中身が開かないので修正する
// おそらくアニメーションと競合していそう
export const Disclosure = ({
  id,
  icon = '',
  overview,
  detail,
  defaultOpen = false,
}: DisclosureProps) => {
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

  const renderIcon = () => {
    if (!icon) {
      return <CircleUserRound size="30">デフォルトアイコン</CircleUserRound>;
    }
    if (typeof icon === 'string') {
      return <Image alt="アバター" src={icon} width="30" height="30" />;
    }
    return icon;
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
        className="flex cursor-pointer list-none justify-between bg-background p-3 text-foreground"
      >
        <div className="flex items-center gap-2">
          {renderIcon()}
          <span>{overview}</span>
        </div>

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
        className="overflow-hidden bg-background text-foreground transition-[max-height] duration-300 ease-out"
      >
        <div className="p-3">{detail}</div>
      </div>
    </details>
  );
};
