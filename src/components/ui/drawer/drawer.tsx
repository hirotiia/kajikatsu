// import { cva } from 'class-variance-authority';

/**
 * Drawer: 状態を管理
 * DrawerTrigger: ボタンを押下するとDrawerContentを表示非表示制御する
 * DrawerContent: DrawerTriggerに制御されるコンテンツ、左右前後で位置指定もできる
 * DrawerCloseTrigger: ボタンを押下すると閉じる
 */
// const drawerVariants = cva(
//   'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
//   {
//     variants: {
//       side: {
//         top: 'inset-x-0 top-0 border-b',
//         bottom: 'inset-x-0 bottom-0 border-t',
//         left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
//         right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
//       },
//     },
//     defaultVariants: {
//       side: 'right',
//     },
//   },
// );

export const DrawerTrigger = () => {
  return (
    <div className="">
      <div className=""></div>
    </div>
  );
};
