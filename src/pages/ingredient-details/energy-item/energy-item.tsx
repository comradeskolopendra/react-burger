import { FC } from "react";
import styles from "./energy-item.module.css";

interface IEnergyItem {
    title: string;
    value: number;
}

const EnergyItem: FC<IEnergyItem> = ({ title, value }) => {
    return (
        <div className={styles.energyItem}>
            <p className="text text_type_main-default">{title}</p>
            <span className="text text_type_digits-default">
                {value}
            </span>
        </div>
    );
};

export default EnergyItem;