export const priceReducer = (state, action) => {
    switch (action.type) {
        case "delete":
            console.log(state.price - action.payload);
            return { price: state.price - action.payload };
            break;

        case "add":
            return { price: state.price + action.payload };
            break;

        default:
            throw new Error("undefined type of action");
    }
};
