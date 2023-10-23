import { FC } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./tabs-wrapper.module.css";

interface ITab {
    value: string;
    title: string;
}

interface ITabsWrapper {
    tabsInfo: ITab[];
    current: string;
    updateCurrent: (value: string) => void;
}

const TabsWrapper: FC<ITabsWrapper> = ({ tabsInfo, current, updateCurrent }) => {
    return (
        <section className={`${styles.tabs} mb-10`}>
            {tabsInfo.map((tab) => {
                return (
                    <Tab
                        value={tab.value}
                        active={current === tab.value}
                        onClick={() => updateCurrent(tab.value)}
                        key={tab.value}
                    >
                        {tab.title}
                    </Tab>
                );
            })}
        </section>
    );
};

export default TabsWrapper;
