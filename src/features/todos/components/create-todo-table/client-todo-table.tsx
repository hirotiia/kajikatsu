import { Table, TableScroll, Td, Th } from '@/components/ui/table';

type Column<T extends string> = {
  id: T;
  label: string;
};

type ClientTodoTableProps<T extends string> = {
  cols: ReadonlyArray<Column<T>>;
  initialData: Array<Record<T, React.ReactNode> & { id: string }>;
};

export const ClientTodoTable = <T extends string>({
  cols,
  initialData,
}: ClientTodoTableProps<T>) => {
  return (
    <TableScroll className="mt-3">
      <Table rounded>
        <thead>
          <tr>
            {cols.map((col, i) => (
              <Th key={col.id} fixed={i === 0 ? 'left' : undefined}>
                {col.label}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {initialData.map((data) => (
            <tr key={data.id}>
              {cols.map((col, id) => (
                <Td key={col.id} fixed={id === 0 ? 'left' : undefined}>
                  {data[col.id]}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
};
