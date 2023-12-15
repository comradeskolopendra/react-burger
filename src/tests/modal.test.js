import createMockStore from "redux-mock-store";
import modalReducer from "../services/store/modal";


describe("modal store", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockResolvedValue({
            json: jest.fn().mockResolvedValue({ result: "OK" }),
            ok: true
        })
    })

    afterEach(() => {
        jest.restoreAllMocks();
    })

    test("should change order-modal visible state", () => {

    })
})