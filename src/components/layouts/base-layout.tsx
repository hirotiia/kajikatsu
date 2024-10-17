import Link from 'next/link';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex items-center justify-between">
        <div className="">
          <Link href="/">カジ活</Link>
        </div>
        <nav className="flex items-center justify-center">
          <ul>
            {[
              {
                title: 'ログイン',
                url: '/login',
              },
            ].map(({ title, url }) => {
              return (
                <li key={title}>
                  <Link href={url}>{title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="sticky top-full">
        <p>
          <small>©2024 nakano hiroya</small>
        </p>
      </footer>
    </>
  );
};
