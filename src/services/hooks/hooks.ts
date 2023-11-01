import {
    TypedUseSelectorHook,
    useDispatch,
    useSelector
} from "react-redux";
import type {} from "redux-thunk/extend-redux";

import type { RootState, AppDispatch } from "../types";


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;