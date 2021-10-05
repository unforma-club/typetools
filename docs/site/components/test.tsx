import styles from "./test.module.scss";

export const TestComponent = () => {
    return (
        <div className={`${styles.container} font-variable`}>
            Test Component
        </div>
    );
};
