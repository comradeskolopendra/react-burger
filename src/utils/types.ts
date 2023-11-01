export interface IUser {
    email: string;
    name: string;
}

export interface IOrder {
    number?: number;
}


export interface IIngredient {
    __v: number;
    _id: string;
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
}

export type TConstructorIngredient = IIngredient & { uuid: string }