import { fetchUserDataClient } from '@/lib/supabase/user/fetch-user-data-client';
import userReducer from '@/stores/user/reducer';

// actions がほかにもあるならここでまとめてexportする
export { fetchUserDataClient };

// userSliceのreducerをstoreに登録できるようにexport
export const reducer = userReducer;
export type { UserStoreState } from './reducer';
