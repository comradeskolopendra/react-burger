import { RootState } from '../services/types';
import { IGetOrderByNumber } from '../services/types';

export const getStateOrderByNumber = (store: RootState): IGetOrderByNumber => store.selectedOrder.data;