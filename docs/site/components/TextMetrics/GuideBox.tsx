interface GuideBoxProps {
    origin: number;
    height: number;
    width: number;
    y: number;
    x: number;
    label: string;
}

export const GuideBox = (props: GuideBoxProps) => {
    const { origin, height, width, y, x, label } = props;
    return (
        <span
            style={{
                position: "absolute",
                left: x,
                bottom: Math.floor(origin),
                userSelect: "none",
            }}
        >
            <span
                style={{
                    position: "absolute",
                    width,
                    height,
                    backgroundColor: "var(--accents-2)",
                    bottom: Math.floor(y),
                    transform: `translateY(${Math.floor(origin) - 1}px)`,
                    fontFeatureSettings: `"ss04"`,
                    // borderRadius: "calc(var(--grid-gap) / 2)",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        bottom: "-1em",
                        left: "calc(var(--grid-gap) / 2)",
                        transform: "translateY(100%)",
                        fontSize: "0.5em",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        textTransform: "capitalize",
                        color: "var(--accents-4)",
                    }}
                >
                    {label}
                </span>
            </span>
        </span>
    );
};
