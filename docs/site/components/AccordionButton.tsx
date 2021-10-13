import styles from "./accordion.module.scss";

interface AccordionButtonProps {
    active: boolean;
    label: string;
    onClick: () => void;
}

export const AccordionButton = (props: AccordionButtonProps) => {
    const { label, onClick, active } = props;
    return (
        <button
            name={label}
            title={label}
            onClick={onClick}
            className={styles.button}
            data-active={active}
        >
            <span data-active={active} className={styles.button_text}>
                {label}
            </span>
        </button>
    );
};
