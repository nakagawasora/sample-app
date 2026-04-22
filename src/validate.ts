/**
 * TODO のタイトルが有効かどうかを判定する
 * - 空文字はダメ
 * - 空白だけもダメ
 * - 100文字を超えるのもダメ
 */
export const isValidTitle = (title: string): boolean => {
  const trimmed = title.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.length > 100) return false;
  return true;
};
