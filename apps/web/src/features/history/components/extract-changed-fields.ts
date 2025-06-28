import { Primitive } from 'zod';

import { Tables } from '@/types/supabase/database.types';

/**
 * beforeData と afterData を比較し、
 * 値に変化があれば、変更前と変更後をオブジェクトに差分として格納する
 */
type TaskData = Tables<'tasks'>;
type Diff<T> = {
  [K in keyof T]?: T[K] extends string | number | boolean | null
    ? { old: T[K]; new: T[K] }
    : never;
};

export function extractChangedFields(
  beforeData: TaskData,
  afterData: TaskData,
): Diff<TaskData> | null {
  const diff: Diff<TaskData> = {};

  for (const key of Object.keys(beforeData) as (keyof TaskData)[]) {
    const beforeVal = beforeData[key];
    const afterVal = afterData[key];

    if (
      isPrimitive(beforeVal) &&
      isPrimitive(afterVal) &&
      beforeVal !== afterVal
    ) {
      diff[key] = { old: beforeVal, new: afterVal } as any;
    }
  }

  return Object.keys(diff).length > 0 ? diff : null;
}

const isPrimitive = (v: unknown): v is Primitive =>
  typeof v === 'string' ||
  typeof v === 'number' ||
  typeof v === 'boolean' ||
  v === null;
