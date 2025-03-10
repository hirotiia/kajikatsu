import { Text } from '@/components/ui/text';

import { LayoutHeader } from './layout-header/layout-header';

export const PublicLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="grid grid-cols-custom-layout bg-custom-gradient">
      <div className="col-span-3 grid grid-cols-custom-layout gap-layout-gap">
        <div className="col-start-2 grid min-h-dvh grid-cols-1 grid-rows-[auto_auto_1fr] md:grid-cols-[auto_1fr] md:grid-rows-[auto_1fr_auto] md:gap-y-6">
          <LayoutHeader className="col-start-1 col-end-3" />
          <main className="col-start-1 row-start-3 pb-24 pt-12 md:col-start-2 md:row-start-2 md:pb-0 md:pt-4">
            {children}
          </main>
          <footer className="col-start-1 row-start-4 pb-8 pt-4 md:col-start-1 md:col-end-3 md:row-start-3">
            <Text spacing="none" className="text-right" textSize="sm">
              <small>©2024 nakano hiroya</small>
            </Text>
          </footer>
        </div>
      </div>
    </div>
  );
};
