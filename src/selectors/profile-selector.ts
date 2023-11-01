import { RootState } from '../services/types';
import { IUser } from '../utils/types';

export const getStateUser = (store: RootState): IUser | null => store.profile.user;