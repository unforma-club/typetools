interface GlyphPathProps {
    path: string;
}

export const GlyphPath = ({ path }: GlyphPathProps) => {
    return <path fill="currentColor" d={path} />;
};

interface GlyphGuideLineProps {
    y: number;
    width: number;
    type?: "solid" | "dash";
}

export const GlyphGuideLine = ({
    y,
    width,
    type = "solid",
}: GlyphGuideLineProps) => {
    return (
        <line
            x1={0}
            x2={width}
            y1={Math.round(y)}
            y2={Math.round(y)}
            stroke="var(--accents-3)"
            strokeWidth="1"
            strokeDasharray={type === "dash" ? "2 2" : "0 0"}
        />
    );
};
