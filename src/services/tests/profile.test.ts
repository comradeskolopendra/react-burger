import { IUser } from "../../utils/types";
import profileReducer, { setUser, clearUser, IProfileState } from "../store/profile";
import { getUserInfoThunk, changeUserInfoThunk } from "../actions/profile";
import { store } from "..";

const user: IUser = {
    email: "test@mail.com",
    name: "TestUser"
}

const updateUser: IUser = {
    name: "comr",
    email: "skolo"
}

const initialState: IProfileState = {
    user: null,
    userError: false,
    userRequest: false,
};

describe("profile slice", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })

    test("should return initial state", () => {
        expect(profileReducer(undefined, { type: "" })).toEqual(initialState);
    })

    test("should clear user", () => {
        const action = clearUser();
        const result = profileReducer(undefined, action);

        expect(result.user).toBe(null)
    })

    test("should set user", () => {
        const action = setUser(user);
        const result = profileReducer(undefined, action);

        expect(result.user).toEqual(user);
    })

    test("should response fulfilled with 'getUserInfoThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({ user })
        })

        const dispatch = jest.fn();
        const thunk = getUserInfoThunk()

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, fulfilled] = calls;
        expect(pending[0].type).toBe("normaapi/user/pending");
        expect(fulfilled[0].type).toBe("normaapi/user/fulfilled");

        expect(profileReducer(undefined, pending[0]).userRequest).toBe(true);
        expect(profileReducer(undefined, fulfilled[0]).user).toEqual(user);
    })

    test("should response rejected with 'getUserInfoThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false
        })

        const dispatch = jest.fn();
        const thunk = getUserInfoThunk()

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/user/pending");
        expect(rejected[0].type).toBe("normaapi/user/rejected");

        expect(profileReducer(undefined, pending[0]).userRequest).toBe(true);
        expect(profileReducer(undefined, rejected[0]).userError).toBe(true);
    })

    test("should response fulfilled with 'changeUserInfoThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: true,
            json: () => Promise.resolve({ success: true, user: updateUser })
        })

        const dispatch = jest.fn();
        const thunk = changeUserInfoThunk({ name: "comr", email: "skolo" });

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, fulfilled] = calls;
        expect(pending[0].type).toBe("normaapi/patchUser/pending");
        expect(fulfilled[0].type).toEqual("normaapi/patchUser/fulfilled");

        expect(profileReducer(undefined, pending[0]).userRequest).toBe(true);
        expect(profileReducer(undefined, fulfilled[0]).user).toEqual(updateUser);
    })

    test("should response rejected with 'changeUserInfoThunk'", async () => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            ...new Response(),
            ok: false,
        })

        const dispatch = jest.fn();
        const thunk = changeUserInfoThunk({ name: "comr", email: "skolo" });

        await thunk(dispatch, store.getState, undefined);

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [pending, rejected] = calls;
        expect(pending[0].type).toBe("normaapi/patchUser/pending");
        expect(rejected[0].type).toBe("normaapi/patchUser/rejected");

        expect(profileReducer(undefined, pending[0]).userRequest).toBe(true);
        expect(profileReducer(undefined, rejected[0]).userError).toBe(true);
    })
})