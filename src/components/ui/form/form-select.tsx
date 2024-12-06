type Props = {
  id: string;
  name: string;
  label: string;
  error: string;
  options: option[];
};

type option = {
  value: string;
  title: string;
};

export const FormSelect = ({ id, name, label, error, options }: Props) => {
  return (
    <div className="grid items-center gap-1 md:grid-cols-[150px_1fr] md:grid-rows-[auto_auto] md:gap-x-3">
      <label htmlFor={id} className="text-left">
        {label}
      </label>
      <div className="rounded-md border border-muted text-primary">
        <select name={name} id={id} className="" required>
          <option value="">時間を選択してください</option>
          {options &&
            options.map(({ value, title }) => (
              <option value={value} key={title}>
                {title}
              </option>
            ))}
        </select>
      </div>
      {error && (
        <p
          className="text-destructive md:col-start-2 md:row-start-2"
          id={`${id}-error`}
          aria-live="assertive"
        >
          {error}
        </p>
      )}
    </div>
  );
};
