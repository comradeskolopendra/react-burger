import {FC} from "react";

interface ICompositionRow {
    amount: number | undefined;
    price: number | undefined;
    name: string | undefined;
    image: string | undefined;
}

const CompositionRow: FC<ICompositionRow> = ({name, price, amount, image}) => {

    return <></>
};

export default CompositionRow;