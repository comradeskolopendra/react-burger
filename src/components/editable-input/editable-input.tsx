import { useState, FC, ChangeEvent } from "react";

import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { TICons } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

interface IEditableInput {
    placeholder: string;
    initialValue: string;
    icon: keyof TICons | undefined;
    disabled: boolean;
    initialType: "text" | "password" | "email" | undefined;
    callback: (...args: any) => any;
    name: string;
    onChange: (...args: any) => any;
    changeTracker: string;
}

const EditableInput: FC<IEditableInput> = ({
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
    const [isDisabled, setIsDisabled] = useState<boolean>(disabled);

    const handleOnIconClick = () => {
        setIsDisabled(!isDisabled);
        if (initialType === "password") {
            setType(type === "text" ? "password" : "text");
        }
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;

        if (value === changeTracker) {
            callback(false);
        } else {
            callback(true);
        }

        if (onChange && typeof onChange === "function") {
            onChange((prevState: object) => ({ ...prevState, [name]: value }));
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
