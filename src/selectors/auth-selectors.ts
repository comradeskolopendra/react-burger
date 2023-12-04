import { RootState } from '../services/types';

export const getStateAuthChecked = (store: RootState): boolean => store.auth.isAuthChecked;
export const getStateIsLoaded = (store: RootState): boolean => store.auth.isLoaded;
export const getStateIsError = (store: RootState): boolean => store.auth.isError;
export const getStateIsPasswordSuccessfullyChanged = (store: RootState): boolean => store.auth.isPasswordSuccessfullyChanged;