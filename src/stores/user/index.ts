import { fetchUserProfileClientRpc } from '@/lib/supabase/user/fetch-user-profile-client-rpc';
import userReducer from '@/stores/user/reducer';

// actions がほかにもあるならここでまとめてexportする
export { fetchUserProfileClientRpc };

// userSliceのreducerをstoreに登録できるようにexport
export const reducer = userReducer;
export type { UserStoreState } from './reducer';
