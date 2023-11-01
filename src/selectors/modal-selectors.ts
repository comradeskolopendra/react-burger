import { RootState } from '../services/types';

export const getStateVisibleOrder = (store: RootState): boolean => store.modal.visibleOrder;
export const getStateVisibleIngredient = (store: RootState): boolean => store.modal.visibleIngredient;