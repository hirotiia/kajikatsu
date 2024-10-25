'use client';

import { Header } from './header/header';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-custom-layout">
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-rows-[auto_1fr_auto]">
          <Header />
          <main className="pb-24 pt-20">{children}</main>
          <footer className="py-4">
            <p className="text-right">
              <small>©2024 nakano hiroya</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};
