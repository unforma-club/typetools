import { CSSProperties } from "react";
import { useMetrics } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { GuideLine } from "./GuideLine";
import { GuideBox } from "./GuideBox";

type UseProps = "hhea" | "typo" | "win";

interface TextMetricsProps {
    fontSize: number;
    lineHeight: number;
    use: UseProps;
    style?: CSSProperties;
}

const spanStyle: CSSProperties = {
    height: "1.75em",
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid",
};

const liStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "var(--grid-gap)",
};

export const TextMetrics = (props: TextMetricsProps) => {
    const { fontSize = 50, lineHeight = 1.3, use = "hhea", style } = props;
    const { selectedFont } = useFonts();

    const {
        baselineOffset,
        ascenderOffset,
        capHeightOffset,
        xHeightOffset,
        descenderOffset,
        boundingBoxRatio,
        lineHeightRatio,
        originOffset,
    } = useMetrics({ font: selectedFont, use, fontSize, lineHeight });

    if (!selectedFont) return <div>Loading...</div>;
    const { typefaceMetrics, typefaceFullName } = selectedFont;

    return (
        <div style={{ position: "relative" }}>
            <div
                style={{
                    fontWeight: "bold",
                    fontSize: "2em",
                    textTransform: "capitalize",
                }}
            >
                {use}
            </div>
            <div
                style={{
                    position: "relative",
                    margin: "4em 0",
                }}
            >
                <GuideBox
                    origin={originOffset}
                    height={boundingBoxRatio * fontSize}
                    width={fontSize * 0.3}
                    y={originOffset - 1}
                    x={fontSize * 0.3 + 5}
                    label="bounding box"
                />

                <GuideBox
                    origin={originOffset}
                    height={lineHeightRatio * fontSize}
                    width={fontSize * 0.3}
                    y={-1}
                    x={0}
                    label="line height"
                />

                <GuideLine
                    y={ascenderOffset}
                    label="ascender"
                    origin={
                        use === "hhea"
                            ? typefaceMetrics.ascender
                            : use === "win"
                            ? typefaceMetrics.usWinAscent
                            : typefaceMetrics.sTypoAscender
                    }
                />
                <GuideLine
                    y={capHeightOffset}
                    label="cap height"
                    origin={typefaceMetrics.capHeight}
                />
                <GuideLine
                    y={xHeightOffset}
                    label="x height"
                    origin={typefaceMetrics.xHeight}
                />
                <GuideLine
                    y={baselineOffset}
                    label="baseline"
                    origin={typefaceMetrics.baseLine}
                />
                <GuideLine
                    y={descenderOffset}
                    label="descender"
                    origin={
                        use === "hhea"
                            ? typefaceMetrics.descender
                            : use === "win"
                            ? typefaceMetrics.usWinDescent * -1
                            : typefaceMetrics.sTypoDescender
                    }
                />

                <div
                    data-scrollbar="hide"
                    style={{
                        ...style,
                        fontFamily: typefaceFullName,
                        fontSize,
                        lineHeight,
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    Hxfg
                </div>
            </div>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    fontFeatureSettings: `"ss04", "tnum"`,
                    fontSize: "0.8em",
                }}
            >
                <li style={{ ...liStyle }}>
                    <span style={{ ...spanStyle }}>Ascender</span>
                    <span style={{ ...spanStyle }}>
                        {use === "hhea"
                            ? typefaceMetrics.ascender
                            : use === "win"
                            ? typefaceMetrics.usWinAscent
                            : typefaceMetrics.sTypoAscender}
                    </span>
                </li>
                <li style={{ ...liStyle }}>
                    <span style={{ ...spanStyle }}>Cap Height</span>
                    <span style={{ ...spanStyle }}>
                        {typefaceMetrics.capHeight}
                    </span>
                </li>
                <li style={{ ...liStyle }}>
                    <span style={{ ...spanStyle }}>X Height</span>
                    <span style={{ ...spanStyle }}>
                        {typefaceMetrics.xHeight}
                    </span>
                </li>
                <li style={{ ...liStyle }}>
                    <span style={{ ...spanStyle }}>Baseline</span>
                    <span style={{ ...spanStyle }}>
                        {typefaceMetrics.baseLine}
                    </span>
                </li>
                <li style={{ ...liStyle }}>
                    <span style={{ ...spanStyle }}>Descender</span>
                    <span style={{ ...spanStyle }}>
                        {use === "hhea"
                            ? typefaceMetrics.descender
                            : use === "win"
                            ? typefaceMetrics.usWinDescent
                            : typefaceMetrics.sTypoDescender}
                    </span>
                </li>
            </ul>
        </div>
    );
};
