import authReducer, { setAuthChecked, IAuthState } from "../store/auth";
import {
    changePasswordThunk,
    logoutUserThunk,
    loginUserThunk,
    resetPasswordThunk,
    registerUserThunk
} from "../actions/auth";
import { store } from "..";

const initialState: IAuthState = {
    isRequest: false,
    isError: false,
    isLoaded: false,
    isAuthChecked: false,
    isPasswordSuccessfullyChanged: false,
};

describe("auth slice", () => {

    afterEach(() => {
        jest.restoreAllMocks();
        window.localStorage.clear();
    })

    test('should return initial state', () => {
        expect(authReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test('should change auth checked state', () => {
        const action = setAuthChecked(true);
        const result = authReducer(undefined, action);
        expect(result.isAuthChecked).toBe(true);
    })

    test("should return fulfilled response with 'changePasswordThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({ password: "123", token: "token" })
        })

        const dispatch = jest.fn();
        const thunk = changePasswordThunk({ password: "321", token: "token" });

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, fulfilled] = calls;
        expect(pending[0].type).toBe("normaapi/reset-password/reset/pending");
        expect(fulfilled[0].type).toBe("normaapi/reset-password/reset/fulfilled");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, fulfilled[0]).isPasswordSuccessfullyChanged).toBe(true);
    })

    test("should return rejected response with 'changePasswordThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false
        })

        const dispatch = jest.fn();
        const thunk = changePasswordThunk({ password: "321", token: "token" });

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/reset-password/reset/pending");
        expect(rejected[0].type).toBe("normaapi/reset-password/reset/rejected");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, rejected[0]).isPasswordSuccessfullyChanged).toBe(false);
        expect(authReducer(undefined, rejected[0]).isError).toBe(true);
    })

    test("should return fulfilled response with 'logoutUserThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response,
            ok: true,
            json: () => Promise.resolve({ success: true })
        })

        const dispatch = jest.fn();
        const thunk = logoutUserThunk();

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(3);

        const [pending, clear, fulfilled] = calls;

        expect(pending[0].type).toBe("normaapi/logout/pending");
        expect(clear[0].type).toBe("profile/clearUser")
        expect(fulfilled[0].type).toBe("normaapi/logout/fulfilled");

        expect(authReducer(undefined, fulfilled[0]).isLoaded).toBe(false);

        expect(window.localStorage.getItem("accessToken")).toBe(null);
        expect(window.localStorage.getItem("refreshToken")).toBe(null);
    })

    test("should return fulfilled response with 'loginUserThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({
                success: true,
                user: {
                    name: "skolo",
                    email: "comr"
                },
                accessToken: "123",
                refreshToken: "321"
            })
        })

        const dispatch = jest.fn();
        const thunk = loginUserThunk({
            email: "comr",
            password: "123"
        })

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(3);

        const [pending, set, fulfilled] = calls;
        expect(pending[0].type).toBe("normaapi/login/pending");
        expect(set[0].type).toBe("profile/setUser");
        expect(fulfilled[0].type).toBe("normaapi/login/fulfilled");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, fulfilled[0]).isLoaded).toBe(true);

        expect(window.localStorage.getItem("accessToken")).not.toBe(null);
        expect(window.localStorage.getItem("refreshToken")).not.toBe(null);
    })

    test("should return rejected response with 'loginUserThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false
        })

        const dispatch = jest.fn();
        const thunk = loginUserThunk({
            email: "comr",
            password: "123"
        })

        await thunk(dispatch, store.getState, undefined);
        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/login/pending");
        expect(rejected[0].type).toBe("normaapi/login/rejected");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, rejected[0]).isError).toBe(true);
        expect(authReducer(undefined, rejected[0]).isLoaded).toBe(false);

        expect(window.localStorage.getItem("accessToken")).toBe(null);
        expect(window.localStorage.getItem("refreshToken")).toBe(null);
    })

    test("should return fulfilled response with 'resetPasswordThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve()
        })

        const dispatch = jest.fn();
        const thunk = resetPasswordThunk("comr");

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, fulfilled] = calls;
        expect(pending[0].type).toBe("normaapi/reset-password/pending");
        expect(fulfilled[0].type).toBe("normaapi/reset-password/fulfilled");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, fulfilled[0]).isRequest).toBe(false);
        expect(authReducer(undefined, fulfilled[0]).isError).toBe(false);
    })

    test("should return rejected response with 'resetPasswordThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false
        })

        const dispatch = jest.fn();
        const thunk = resetPasswordThunk("comr");

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/reset-password/pending");
        expect(rejected[0].type).toBe("normaapi/reset-password/rejected");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, rejected[0]).isPasswordSuccessfullyChanged).toBe(false);
    })

    test("should return fulfilled response with 'registerUserThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({
                success: true,
                user: {
                    name: "skolo",
                    email: "comr"
                },
                accessToken: "123",
                refreshToken: "321"
            })
        })

        const dispatch = jest.fn();
        const thunk = registerUserThunk({ name: "skolo", email: "comr", password: "123" });

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(3);

        const [pending, set, fullilled] = calls;
        expect(pending[0].type).toBe("normaapi/register/pending");
        expect(set[0].type).toBe("profile/setUser")
        expect(fullilled[0].type).toBe("normaapi/register/fulfilled");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, fullilled[0]).isError).toBe(false);
        expect(authReducer(undefined, fullilled[0]).isRequest).toBe(false);
    })

    test("should return rejected response with 'registerUserThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false
        })

        const dispatch = jest.fn();
        const thunk = registerUserThunk({ name: "skolo", email: "comr", password: "123" });

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/register/pending");
        expect(rejected[0].type).toBe("normaapi/register/rejected");

        expect(authReducer(undefined, pending[0]).isRequest).toBe(true);

        expect(authReducer(undefined, rejected[0]).isError).toBe(true);
        expect(authReducer(undefined, rejected[0]).isRequest).toBe(false);
    })
})