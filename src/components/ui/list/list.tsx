import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

type ListItem = {
  text: string;
};

type ListProps = {
  listItems: ListItem[];
  as?: 'ol' | undefined | null;
};

const textSizeVariants = cva('', {
  variants: {
    textSize: {
      sm: 'text-xs md:text-sm',
      md: 'text-sm md:text-base',
      lg: 'text-base md:text-lg',
    },
  },
  defaultVariants: {
    textSize: 'md',
  },
});

type Props = ListProps & VariantProps<typeof textSizeVariants>;

export const List = ({ listItems, as, textSize }: Props) => {
  const ListComponent: React.ElementType = as === 'ol' ? 'ol' : 'ul';

  return (
    <ListComponent className="mt-10 pl-4">
      {listItems.map(({ text }, i) => {
        return (
          <li key={text} className={i !== 0 ? 'mt-3' : ''}>
            <div className="flex items-start gap-3">
              <span className="mt-3 size-[6px] shrink-0 -translate-y-1/2 rounded-full bg-black dark:bg-foreground"></span>
              <span className={cn(textSizeVariants({ textSize }))}>{text}</span>
            </div>
          </li>
        );
      })}
    </ListComponent>
  );
};
