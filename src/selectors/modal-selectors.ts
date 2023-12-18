import { RootState } from '../services/types';

export const getStateVisibleOrder = (store: RootState): boolean => store.modal.visibleOrder;