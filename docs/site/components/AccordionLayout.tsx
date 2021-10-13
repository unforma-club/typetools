import styles from "./accordion-layout.module.scss";
import type { CSSProperties, FC } from "react";
import { animated, useSpring } from "react-spring";
import { useElementSize } from "libs/hooks";

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

    const {
        ref,
        bounds: { height },
    } = useElementSize();

    const spring = useSpring({
        from: { height: 0, opacity: 0, y: 0 },
        to: {
            height: isActive ? height : 0,
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : height,
        },
        config: { mass: 5, tension: 2000, friction: 200 },
        reverse: !isActive,
    });

    return (
        <animated.div
            data-active={isActive}
            className={styles.container}
            style={{
                position: "relative",
                padding: "0 calc(var(--grid-gap) * 4)",
                ...spring,
            }}
        >
            <div
                // @ts-ignore
                ref={ref}
                style={{
                    // position: "relative",
                    minHeight: "calc(100vh - calc(var(--header-height) * 6))",
                    // maxHeight: "calc(100vh - calc(var(--header-height) * 2))",
                    ...style,
                }}
            >
                {children}
            </div>
        </animated.div>
    );
};
