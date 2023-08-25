import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./tabs-wrapper.module.css";

const TabsWrapper = ({ tabsInfo, current, updateCurrent }) => {
    return (
        <section className={`${styles.tabs} mb-10`}>
            {tabsInfo.map((tab) => {
                return (
                    <Tab
                        value={tab.value}
                        active={current === tab.value}
                        onClick={() => updateCurrent(tab.value)}
                    >
                        {tab.title}
                    </Tab>
                );
            })}
        </section>
    );
};

export default TabsWrapper;
