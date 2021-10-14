import styles from "./accordion.module.scss";
import type { CSSProperties, FC } from "react";

export interface BaseAccordion {
    label: string;
    style?: CSSProperties;
    isActive: boolean;
}

export interface AccordionLayoutProps extends BaseAccordion {
    height?: number;
}

export const AccordionLayout: FC<AccordionLayoutProps> = (props) => {
    const { children, isActive, style } = props;

    return (
        <div
            data-active={isActive}
            className={styles.layout}
            style={{
                height: isActive
                    ? "calc(100vh - calc(var(--header-height) * 5))"
                    : 0,
                opacity: isActive ? 1 : 0,
                overflow: "scroll",
                transition:
                    "height var(--bezier-transition), opacity var(--main-transition), transform var(--main-transition)",
                ...style,
            }}
        >
            {children}
        </div>
    );
};
