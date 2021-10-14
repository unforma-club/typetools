import { CSSProperties } from "react";
import { useMetrics } from "@unforma-club/typetools";
import { GuideLine } from "./GuideLine";
import { GuideBox } from "./GuideBox";
import { BaseTypeface } from "@unforma-club/typetools";

type UseProps = "hhea" | "typo" | "win";

interface TextMetricsProps {
    fontSize: number;
    lineHeight: number;
    use: UseProps;
    style?: CSSProperties;
    font: BaseTypeface;
    text?: string;
    title?: boolean;
    info?: boolean;
    guideBar?: boolean;
}

const spanStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
};

const liStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "var(--grid-gap)",
};

export const TextMetrics = (props: TextMetricsProps) => {
    const {
        fontSize = 50,
        lineHeight = 1.3,
        use = "hhea",
        style,
        font,
        text = "Hxfg",
        title = false,
        info = false,
        guideBar = false,
    } = props;

    const {
        baselineOffset,
        ascenderOffset,
        capHeightOffset,
        xHeightOffset,
        descenderOffset,
        boundingBoxRatio,
        lineHeightRatio,
        originOffset,
    } = useMetrics({ font, use, fontSize, lineHeight });

    const { typefaceMetrics, typefaceFullName, typefaceStyle } = font;

    return (
        <div
            style={{
                position: "relative",
                height: "calc(var(--accordion-height) - 2px)",
                overflow: "hidden",
            }}
        >
            {title && (
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "2em",
                        textTransform: "capitalize",
                        marginTop: "calc(var(--header-height) / 2)",
                        zIndex: 10,
                        position: "relative",
                    }}
                >
                    {use}
                </div>
            )}
            <div
                style={{
                    // position: "absolute",
                    // top: "calc(50% - calc(var(--header-height) * 1))",
                    // transform: "translateY(-50%)",
                    position: "relative",
                    margin: "4em 0",
                    width: "100%",
                }}
            >
                {guideBar && (
                    <>
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
                    </>
                )}

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
                        fontStyle:
                            typefaceStyle === "italic" ? "italic" : "normal",
                        fontSize,
                        lineHeight,
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {text}
                </div>
            </div>

            {info && (
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        fontFeatureSettings: `"ss04", "tnum"`,
                        fontSize: "0.8em",
                        position: "absolute",
                        bottom: 0,
                        color: "var(--accents-8)",
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
            )}
        </div>
    );
};
