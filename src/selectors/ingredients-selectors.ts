import { RootState } from '../services/types';
import { IIngredient } from '../utils/types';

export const getStateIngredients = (store: RootState): IIngredient[] => store.ingredients.ingredients;
export const getStateIngredientsRequest = (store: RootState): boolean => store.ingredients.ingredientsRequest;
export const getStateIngredientsError = (store: RootState): boolean => store.ingredients.ingredientsFailed;