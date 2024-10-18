type ListItem = {
  text: string;
};

type List = {
  listItems: ListItem[];
  as?: 'ol' | undefined | null;
};

export const List = ({ listItems, as }: List) => {
  const ListComponent: React.ElementType = as === 'ol' ? 'ol' : 'ul';

  return (
    <ListComponent className="mt-10 pl-4">
      {listItems.map(({ text }, i) => {
        return (
          <li key={text} className={i !== 0 ? 'mt-3' : ''}>
            <div className="flex items-start gap-5">
              <span className="mt-3 size-[6px] shrink-0 -translate-y-1/2 rounded-full bg-black"></span>
              <span className="md:text-lg">{text}</span>
            </div>
          </li>
        );
      })}
    </ListComponent>
  );
};
