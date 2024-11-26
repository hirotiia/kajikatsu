import { currentUser } from '@/utils/auth';

import { LayoutAside } from './layout-aside/layout-aside';
import { LayoutHeader } from './layout-header/layout-header';

export const AppLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await currentUser();

  return (
    <div className="grid grid-cols-custom-layout bg-custom-gradient">
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-cols-1 grid-rows-[auto_auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr_auto] md:gap-6">
          <LayoutHeader className="col-start-1 col-end-3" />
          <main className="col-start-1 row-start-3 pb-24 pt-12 md:col-start-2 md:row-start-2 md:py-0">
            {children}
          </main>
          {user && <LayoutAside />}
          <footer className="col-start-1 row-start-4 pb-8 pt-4 md:col-start-1 md:col-end-3 md:row-start-3">
            <p className="text-right">
              <small>©2024 nakano hiroya</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
