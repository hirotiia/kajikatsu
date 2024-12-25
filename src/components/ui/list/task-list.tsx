import Image from 'next/image';

type Item = {
  id: string;
  title: string;
  description?: string;
  expiresAt?: string;
  avatar_url?: string;
};
type TaskListProps = {
  listItems: Item[];
};

export const TaskList = ({ listItems }: TaskListProps) => {
  return (
    <ul>
      {listItems.map(({ id, title, description, expiresAt, avatar_url }) => (
        <li key={id}>
          <div className="">
            {avatar_url && (
              <div className="">
                <Image src={avatar_url} alt="アバター" />
              </div>
            )}
            <p>
              <b>{title}</b>
            </p>
            {description && <p>{description}</p>}
            {expiresAt && <p>{expiresAt}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
};
