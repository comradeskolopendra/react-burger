import { useState } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const EditableInput = ({
    placeholder,
    initialValue,
    icon,
    disabled = true,
    initialType = "text",
    callback,
    name,
    onChange,
    changeTracker,
}) => {
    const [type, setType] = useState(initialType);
    const [isDisabled, setIsDisabled] = useState(disabled);

    const handleOnIconClick = () => {
        setIsDisabled(!isDisabled);
        if (initialType === "password") {
            setType(type === "text" ? "password" : "text");
        }
    };

    const handleOnChange = (event) => {
        const {
            target: { value },
        } = event;

        if (value === changeTracker) {
            callback(false);
        } else {
            callback(true);
        }

        if (onChange && typeof onChange === "function") {
            onChange((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    return (
        <Input
            placeholder={placeholder}
            icon={icon}
            onIconClick={handleOnIconClick}
            value={initialValue}
            onChange={handleOnChange}
            disabled={isDisabled}
            type={type}
        />
    );
};

export default EditableInput;
