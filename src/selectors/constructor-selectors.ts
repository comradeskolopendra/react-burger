import { RootState } from '../services/types';
import { IIngredient, TConstructorIngredient } from '../utils/types';

export const getStateSelectedBun = (store: RootState): IIngredient | null => store.constructorData.selectedBun;
export const getStateSelectedIngredients = (store: RootState): TConstructorIngredient[] => store.constructorData.selectedIngredients;