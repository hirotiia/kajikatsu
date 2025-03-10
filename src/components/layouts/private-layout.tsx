import { Text } from '@/components/ui/text';

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
          <main className="col-start-1 col-end-3 row-start-2 row-end-3 mt-14 md:col-start-2 md:row-start-2 md:mt-0 md:py-0 md:pb-24">
            {children}
          </main>
          <LayoutAside className="fixed max-md:bottom-2 max-md:left-1/2 max-md:w-[calc(100%-2*var(--layout-gap))] max-md:-translate-x-1/2 md:top-32 md:w-[200px]" />
          <footer className="col-start-1 row-start-4 pb-20 pt-4 md:col-start-1 md:col-end-3 md:row-start-3 md:pb-8">
            <Text spacing="none" className="text-right" textSize="sm">
              <small>©2024 nakano hiroya</small>
            </Text>
          </footer>
        </div>
      </div>
    </div>
  );
};
