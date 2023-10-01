import { useState } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

const EditableInput = ({ placeholder, initialValue, icon, disabled = true, initialType = "text", callback }) => {
    const [value, setValue] = useState(initialValue);
    const [type, setType] = useState(initialType);
    const [isDisabled, setIsDisabled] = useState(disabled);

    const handleOnIconClick = () => {
        setIsDisabled(!isDisabled);
        if (initialType === "password") {
            setType(type === "text" ? "password" : "text")
        }
    };

    const handleOnChange = (event) => {
        const { target: { value } } = event;

        if (value === initialValue) {
            callback(false)
        } else {
            callback(true)
        }

        setValue(value)
    }

    return (
        <Input
            placeholder={placeholder}
            icon={icon}
            onIconClick={handleOnIconClick}
            value={value}
            onChange={handleOnChange}
            disabled={isDisabled}
            type={type}
        />
    )
};

export default EditableInput;