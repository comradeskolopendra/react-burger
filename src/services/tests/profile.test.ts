import profileSlice, { setUser, clearUser, IProfileState } from "../store/profile";

const initialState: IProfileState = {
    user: null,
    userError: false,
    userRequest: false,
};

describe("profile slice", () => {
    test("should return initial state", () => {
        expect(profileSlice(undefined, { type: "" })).toEqual(initialState);
    })

    test("should clear user", () => {
        const action = clearUser();
        const result = profileSlice(undefined, action);

        expect(result.user).toBe(null)
    })

    test("should set user", () => {
        const action = setUser({ email: "test@yandex.ru", name: "yandex" });
        const result = profileSlice(undefined, action);

        expect(result.user).toEqual({ email: "test@yandex.ru", name: "yandex" });
    })
})