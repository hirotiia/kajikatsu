import { config } from '@/config/config';

export default function TodosPage() {
  return (
    <>
      <hgroup className="mb-14 flex flex-col-reverse items-center justify-center gap-4 md:mb-24 md:gap-6">
        <h1 className="text-4xl md:text-6xl">家事リスト</h1>
        <p className="text-xl md:text-2xl">
          ~{config.APP_NAME}で家事の負荷を分散しよう~
        </p>
      </hgroup>
    </>
  );
}
