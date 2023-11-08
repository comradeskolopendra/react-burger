import { RootState } from "../services/types";

export const getStateWSProfileOrdersMessage = (store: RootState) => store.profileOrders.wsMessage;