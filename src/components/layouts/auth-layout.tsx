export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-custom-layout bg-custom-gradient">
      <div className="col-span-2 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-rows-[1fr_auto] md:grid-cols-[auto_1fr]">
          <main className="col-start-1 row-start-1 pb-24 pt-12 md:col-start-2 md:row-start-1 md:pb-0 md:pt-4">
            {children}
          </main>
          <footer className="col-start-1 row-start-2 pb-8 pt-4 md:col-start-1 md:col-end-3 md:row-start-2">
            <p className="text-right">
              <small>©2024 nakano hiroya</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
