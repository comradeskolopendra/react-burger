import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
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
                        key={tab.value}
                    >
                        {tab.title}
                    </Tab>
                );
            })}
        </section>
    );
};

TabsWrapper.propTypes = {
    tabsInfo: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string
    }).isRequired).isRequired,
    current: PropTypes.string,
    updateCurrent: PropTypes.func.isRequired
}

export default TabsWrapper;
