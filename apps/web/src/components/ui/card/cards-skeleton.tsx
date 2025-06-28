export function CardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <div className="glassmorphism w-full space-y-2 rounded-lg p-4 shadow-sm md:grow">
            <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
            <div className="mt-2 space-y-1">
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            <div className="h-4 w-40 animate-pulse rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  );
}
