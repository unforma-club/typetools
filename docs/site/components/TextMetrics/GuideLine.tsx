import styles from "./metrics.module.scss";

interface GuideLineProps {
    y: number;
    label: "ascender" | "cap height" | "x height" | "baseline" | "descender";
    origin: number;
}

export const GuideLine = ({ y, label, origin }: GuideLineProps) => {
    return (
        <span
            className={styles.guide_line}
            data-guide={label}
            style={{ bottom: Math.floor(y) }}
        >
            <span className={styles.guide_line_info}>
                <span>{label}</span>
                <span>{origin}</span>
            </span>
        </span>
    );
};
