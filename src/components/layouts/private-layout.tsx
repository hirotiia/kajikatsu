import { LayoutAside } from './layout-aside/layout-aside';
import { LayoutHeader } from './layout-header/layout-header';

export const PrivateLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-custom-layout bg-custom-gradient">
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-cols-1 grid-rows-[auto_1fr] md:grid-cols-[200px_1fr] md:grid-rows-[auto_1fr_auto] md:gap-6">
          <LayoutHeader
            className="z-30 col-start-1 col-end-3 mt-2 md:mt-6"
            isUserProfile={true}
          />
          <main className="col-start-1 col-end-3 row-start-2 row-end-3 mt-14 md:col-start-2 md:row-start-2 md:mt-12 md:py-0 md:pb-24">
            {children}
          </main>
          <LayoutAside className="sticky inset-x-0 bottom-2 top-32" />
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
