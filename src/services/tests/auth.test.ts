import authReducer, { setAuthChecked, IAuthState } from "../store/auth";

const initialState: IAuthState = {
    isRequest: false,
    isError: false,
    isLoaded: false,
    isAuthChecked: false,
    isPasswordSuccessfullyChanged: false,
};

describe("auth slice", () => {
    test('should return initial state', () => {
        expect(authReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test('should change auth checked state', () => {
        const action = setAuthChecked(true);
        const result = authReducer(undefined, action);
        expect(result.isAuthChecked).toBe(true);
    })
})