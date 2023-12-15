import { RootState } from "../services/types";
import type { IWSMessage } from "../utils/types";

import { TWSStatus } from "../services/types";

export const getStateWSFeedMessage = (store: RootState): IWSMessage | null => store.feed.wsMessage;
export const getStateWSFeedStatus = (store: RootState): TWSStatus => store.feed.status;
