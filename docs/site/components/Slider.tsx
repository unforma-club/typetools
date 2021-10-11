import styles from "./slider.module.scss";

interface SliderProps {
    min: number;
    max: number;
    step: number;
    value: number;
    defaultValue: number;
    label: string;
    onDoubleClick: (e: number) => void;
    onChange: (e: number) => void;
}

export const Slider = (props: SliderProps) => {
    const {
        min,
        max,
        step,
        value,
        defaultValue,
        label,
        onDoubleClick,
        onChange,
    } = props;

    return (
        <label className={styles.container}>
            <div className={styles.info}>
                <span>{label}</span>
                <output>{value % 1 === 0 ? value : value.toFixed(2)}</output>
            </div>
            <input
                className={styles.slide}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onDoubleClick={() => onDoubleClick(defaultValue)}
                onChange={(e) => onChange(e.target.valueAsNumber)}
                data-changed={value !== defaultValue}
                style={{
                    // @ts-ignore
                    "--background-size": `${
                        ((value - min) * 100) / (max - min)
                    }%`,
                }}
            />
        </label>
    );
};
