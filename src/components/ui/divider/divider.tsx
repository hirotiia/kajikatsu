type DividerProps = {
  text: string;
};

export function Divider({ text }: DividerProps) {
  return (
    <p className="relative mt-6 flex w-full items-center text-primary before:absolute before:left-0 before:right-[calc(50%+2rem)] before:top-1/2 before:h-px before:bg-primary before:content-[''] after:absolute after:left-[calc(50%+2rem)] after:right-0 after:top-1/2 after:h-px after:bg-primary after:content-['']">
      <span className="mx-auto">{text}</span>
    </p>
  );
}
