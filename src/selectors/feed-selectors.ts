import { RootState } from "../services/types";
import { IWSMessage } from "../utils/types";

export const getStateWSFeedMessage = (store: RootState): IWSMessage | null => store.feed.wsMessage;
