import PropTypes from "prop-types";

export const burgerSidesTypes = {
    onOpenModal: PropTypes.func.isRequired,
};

export const modalContentTypes = {
    changeVisibility: PropTypes.func.isRequired,
};

export const modalOverlayTypes = {
    onClose: PropTypes.func.isRequired,
};

export const modalTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export const energyItemTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export const tabsTypes = {
    tabsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            title: PropTypes.string,
        }).isRequired
    ).isRequired,
    current: PropTypes.string,
    updateCurrent: PropTypes.func.isRequired,
};

export const ingredientsSectionTypes = {
    title: PropTypes.string,
    ingredients: PropTypes.arrayOf(
        PropTypes.shape({
            __v: PropTypes.number,
            _id: PropTypes.string,
            calories: PropTypes.number,
            carbohydrates: PropTypes.number,
            fat: PropTypes.number,
            image: PropTypes.string,
            image_large: PropTypes.string,
            image_mobile: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            proteins: PropTypes.number,
            type: PropTypes.string,
        }).isRequired
    ).isRequired,
    onClick: PropTypes.func.isRequired,
};

export const ingredientCardTypes = {
    ingredient: PropTypes.shape({
        __v: PropTypes.number,
        _id: PropTypes.string,
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export const priceInfoTypes = {
    onOpenModal: PropTypes.func.isRequired,
    priceState: PropTypes.shape({
        price: PropTypes.number,
    }),
};

export const ingrediensWrapperTypes = {
    dispatch: PropTypes.func.isRequired,
};

export const navLinkTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
};
