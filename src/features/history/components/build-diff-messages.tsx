import React from 'react';

type DiffRecord = Record<
  string,
  {
    old: any;
    new: any;
  }
>;

const FIELD_LABELS: Record<string, string> = {
  title: 'タイトル',
  expires_at: '期限日',
  status_id: 'ステータス',
  description: '説明',
  updated_at: '更新日',
  assignee_id: '担当者',
};

/**
 * Diff オブジェクトを受け取り、JSXの <ul><li>...</li></ul> リスト要素として返す
 */
export function buildDiffMessages(diff: DiffRecord): JSX.Element {
  return (
    <>
      <p className="text-lg">
        <b>変更差分詳細</b>
      </p>
      <ul className="mt-3">
        {Object.entries(diff).map(([key, { old, new: newVal }]) => {
          // マッピングを使って日本語のラベルに変換
          const label = FIELD_LABELS[key] ?? key;
          return (
            <li key={key}>
              <strong>{label}</strong>: {old} ⇒ {newVal}
            </li>
          );
        })}
      </ul>
    </>
  );
}
