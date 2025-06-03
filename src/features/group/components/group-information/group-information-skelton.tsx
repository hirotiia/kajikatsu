export const GroupInformationSkeleton = () => {
  return (
    <>
      <dl className="grid animate-pulse gap-y-2">
        <div className="grid grid-cols-[85px_1fr] gap-x-1 md:grid-cols-[100px_1fr] md:gap-x-4">
          <dt className="text-sm font-semibold md:text-base">グループ名：</dt>
          <dd className="h-4 w-24 rounded bg-muted" />
        </div>
      </dl>
      <div className="mt-6 flex gap-3">
        <div className="h-11 w-28 rounded bg-muted" />
        <div className="h-11 w-28 rounded bg-muted" />
      </div>
    </>
  );
};
