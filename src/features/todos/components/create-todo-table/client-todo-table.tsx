'use client';

import { Table, TableScroll, Td, Th } from '@/components/ui/table';

import { useTodos } from './hooks/use-todos';

export type Column<T extends string> = {
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
  const { todos } = useTodos(initialData);

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
          {todos.map((todo) => (
            <tr key={todo.id}>
              {cols.map((col, id) => (
                <Td key={col.id} fixed={id === 0 ? 'left' : undefined}>
                  {todo[col.id]}
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableScroll>
  );
};
