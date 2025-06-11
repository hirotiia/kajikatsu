import { cn } from '@/utils/cn';

type TableElementProps = React.HTMLAttributes<HTMLTableElement> & {
  className?: string;
};

type HeadColProps<T extends object> = {
  id: keyof T;
  label: string;
};

type TableProps<T extends object> = {
  rows: T[];
  headCols: readonly HeadColProps<T>[];
  caption?: string;
  className?: string;
};

type TableHeadProps<T extends object> = Pick<TableProps<T>, 'headCols'> & {
  className?: string;
};
type TableBodyProps<T extends object> = Pick<
  TableProps<T>,
  'rows' | 'headCols'
> & {
  className?: string;
};

const TableElement = ({ className, ...props }: TableElementProps) => (
  <table
    className={cn('w-full caption-bottom text-sm bg-muted p-3', className)}
    {...props}
  />
);

const TableHead = <T extends object>({
  headCols,
  className,
}: TableHeadProps<T>) => {
  return (
    <thead className={cn(className)}>
      <tr>
        {headCols.map((col) => (
          <th
            key={col.id as string}
            className={cn(
              'p-3 text-left md:text-lg min-w-[95px] md:min-w-[150px]',
            )}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = <T extends object>({
  headCols,
  rows,
  className,
}: TableBodyProps<T>) => {
  console.log(rows);
  return (
    <tbody
      className={cn(
        'bg-background rounded-md [&>tr:not(:last-child)]:border-b',
        className,
      )}
    >
      {rows.map((row, index) => (
        <tr key={index}>
          {headCols.map((col) => (
            <td key={col.id as string} className={cn('p-3')}>
              <>{row[col.id]}</>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export { TableBody, TableElement, TableHead };

export const Table = <T extends object>({
  headCols,
  rows,
  caption,
  className,
}: TableProps<T>) => {
  return (
    <TableElement className={className}>
      {caption && <caption>props.caption</caption>}
      <TableHead headCols={headCols} />
      <TableBody rows={rows} headCols={headCols} />
    </TableElement>
  );
};
