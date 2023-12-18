import { RootState } from "../services/types";
import type { IWSMessage } from "../utils/types";
import type { TWSStatus } from "../services/types";

export const getStateWSProfileOrdersMessage = (store: RootState): IWSMessage | null => store.profileOrders.wsMessage;
export const getStateWSProfileStatus = (store: RootState): TWSStatus => store.profileOrders.status;