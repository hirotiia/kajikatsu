import { LayoutFooter } from './layout-footer/layout-footer';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-custom-layout bg-custom-gradient">
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-cols-1 grid-rows-[1fr_auto]">
          <main className="col-start-1 col-end-3 row-start-1 row-end-2">
            {children}
          </main>

          <LayoutFooter className="col-start-1 col-end-3 row-start-2 row-end-3 pb-8 pt-16 md:pt-24" />
        </div>
      </div>
    </div>
  );
};
