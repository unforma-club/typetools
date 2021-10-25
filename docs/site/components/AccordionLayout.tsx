import styles from "./accordion.module.scss";
import { CSSProperties, FC } from "react";
import { animated, useSpring } from "react-spring";
import { useMeasure, usePrevious } from "libs/hooks";

export interface BaseAccordion {
    label: string;
    style?: CSSProperties;
    isActive: boolean;
    onClick: () => void;
    buttonStyle?: CSSProperties;
}

export interface AccordionLayoutProps extends BaseAccordion {}

export const AccordionLayout: FC<AccordionLayoutProps> = (props) => {
    const { children, isActive, style } = props;

    const previous = usePrevious(isActive);
    const [ref, { height: viewHeight }] = useMeasure();

    const parent = useSpring({
        opacity: isActive ? 1 : 0,
        height: isActive ? viewHeight : 0,
        y: isActive ? 0 : -200,
        config: { mass: 3, tension: 2000, friction: 200 },
        reset: isActive && previous !== isActive,
    });

    const child = useSpring({
        y: isActive ? 0 : -(viewHeight / 8),
        config: { mass: 5, tension: 1500, friction: 400 },
        delay: 100,
        reset: isActive && previous !== isActive,
    });

    return (
        <>
            <animated.div
                data-active={isActive}
                className={styles.layout}
                style={{
                    ...parent,
                    // opacity: parent.opacity,
                    // height:
                    //     isActive && previous === isActive
                    //         ? "auto"
                    //         : parent.height,
                }}
            >
                <animated.div
                    ref={ref}
                    children={children}
                    style={{
                        minHeight:
                            "calc(100vh - calc(var(--header-height) * 5) - 1em)",
                        position: "relative",
                        ...style,
                        ...child,
                    }}
                />
            </animated.div>
        </>
    );
};
