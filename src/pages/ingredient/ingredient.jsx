import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const IngredientPage = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log(id)
    }, [])


    return (
        <>
            12312312312
        </>
    );
};

export default IngredientPage;
