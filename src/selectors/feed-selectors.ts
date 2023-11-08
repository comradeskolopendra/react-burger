import { RootState } from "../services/types";
import { IWSFeedMessage } from "../services/types";

export const getStateWSFeedMessage = (store: RootState): IWSFeedMessage | null => store.feed.wsMessage;
