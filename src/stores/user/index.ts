// ↑ reducerファイルがデフォルトエクスポートで
//   actions(例: fetchUserData) は名前付きエクスポートの場合
import { fetchUserData } from '@/lib/supabase/user/fetch-user-data';
import userReducer from '@/stores/user/reducer';

// actions がほかにもあるならここでまとめてexportする
export { fetchUserData };

// userSliceのreducerをstoreに登録できるようにexport
export const reducer = userReducer;
