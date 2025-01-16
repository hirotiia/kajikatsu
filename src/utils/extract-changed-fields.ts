/**
 * details.old と details.new を比較し、
 * 値が異なるキーのみ同じキー名で新しいオブジェクトに { key: newVal } として格納する。
 * 変化がなければ null を返す。
 */
export function extractChangedFields(details: any) {
  if (!details || !details.old || !details.new) return null;

  const oldData = details.old;
  const newData = details.new;
  const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);

  const diff: Record<string, { old: any; new: any }> = {};

  for (const key of allKeys) {
    const oldVal = oldData[key];
    const newVal = newData[key];

    if (oldVal !== newVal) {
      diff[key] = { old: oldVal, new: newVal };
    }
  }

  if (Object.keys(diff).length === 0) {
    return null;
  }

  console.log(diff);
  return diff;
}
