import { CSSProperties, forwardRef } from "react";
import styles from "./accordion.module.scss";

interface AccordionButtonProps {
    active: boolean;
    label: string;
    onClick: () => void;
    style?: CSSProperties;
}

export const AccordionButton = forwardRef<
    HTMLButtonElement,
    AccordionButtonProps
>((props: AccordionButtonProps, ref) => {
    const { label, onClick, active, style } = props;
    return (
        <button
            ref={ref}
            name={label}
            title={label}
            onClick={onClick}
            className={styles.button}
            data-active={active}
            style={style}
            disabled={active}
        >
            <span data-active={active} className={styles.button_text}>
                {label}
            </span>
        </button>
    );
});
