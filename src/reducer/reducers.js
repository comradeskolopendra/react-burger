export const priceReducer = (state, action) => {
    switch (action.type) {
        case "delete":
            return { price: state.price - action.payload };

        case "add":
            return { price: state.price + action.payload };

        default:
            throw new Error("undefined type of action");
    }
};
