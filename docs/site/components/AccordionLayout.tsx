import styles from "./accordion.module.scss";
import type { CSSProperties, FC } from "react";
import { animated, useSpring } from "react-spring";
import { useMeasure } from "libs/hooks";

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
    const [ref, { height }] = useMeasure();

    const parent = useSpring({
        from: { height: 0, opacity: 0 },
        to: {
            height: isActive ? height : 0,
            opacity: isActive ? 1 : 0,
        },
        config: { mass: 3, tension: 2000, friction: 200 },
        reverse: !isActive,
    });

    const child = useSpring({
        from: { y: -(height / 8) },
        to: { y: isActive ? 0 : height },
        config: { mass: 5, tension: 2000, friction: 400 },
        reverse: !isActive,
    });

    return (
        <animated.div
            data-active={isActive}
            className={styles.layout}
            style={{ ...parent }}
        >
            <animated.div
                ref={ref}
                style={{
                    minHeight: "calc(100vh - calc(var(--header-height) * 6))",
                    position: "relative",
                    ...style,
                    ...child,
                }}
            >
                {children}
            </animated.div>
        </animated.div>
    );
};
