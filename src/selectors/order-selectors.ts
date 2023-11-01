import { RootState } from '../services/types';
import { IOrder } from '../utils/types';

export const getStateOrderFailed = (store: RootState): boolean => store.order.orderFailed;
export const getStateOrder = (store: RootState): IOrder | null => store.order.order;
export const getStateOrderRequest = (store: RootState): boolean => store.order.orderRequest;
