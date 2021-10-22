import styles from "./glyph.module.scss";
import { NewGlyph } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { useMeasure } from "libs/hooks";
import { useSVGMetrics } from "libs/use-svg-metrics";

interface GlyphsAsideProps {
    glyph: NewGlyph;
    glyphsLength: number;
    charsLength: number;
}

export const GlyphsAside = ({ glyph }: GlyphsAsideProps) => {
    const { selectedFont } = useFonts();
    const { typefaceMetrics } = selectedFont;

    const [ref, { width, height }] = useMeasure();

    const {
        glyphBaseline,
        glyphSize,
        xmin,
        parentHeight,
        parentWidth,
        glyphScale,
    } = useSVGMetrics({
        width,
        height,
        advanceWidth: glyph.glyph.advanceWidth,
        ...typefaceMetrics,
    });

    const ypx = (val: number) => glyphBaseline - val * glyphScale;
    return (
        <aside className={styles.aside}>
            <div className={styles.glyph_inspector}>
                <div
                    ref={ref}
                    style={{
                        // height: "calc(100vh - calc(var(--header-height) * 10))",
                        height: "100%",
                        position: "relative",
                        // backgroundColor: "var(--accents-2)",
                        // backgroundColor: "var(--accents-12)",
                        borderBottom: "1px solid",
                        // color: "var(--accents-1)",
                    }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox={`0 0 ${parentWidth} ${parentHeight}`}
                        fill="currentColor"
                        style={{ userSelect: "none" }}
                    >
                        <g>
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.ascender)}
                                y2={ypx(typefaceMetrics.ascender)}
                                stroke="var(--accents-8)"
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.capHeight)}
                                y2={ypx(typefaceMetrics.capHeight)}
                                stroke="var(--accents-8)"
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.xHeight)}
                                y2={ypx(typefaceMetrics.xHeight)}
                                stroke="var(--accents-8)"
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.baseLine)}
                                y2={ypx(typefaceMetrics.baseLine)}
                                stroke="var(--accents-8)"
                                strokeWidth="0.5"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.descender)}
                                y2={ypx(typefaceMetrics.descender)}
                                stroke="var(--accents-8)"
                                strokeWidth="0.5"
                                strokeDasharray="2 2"
                            />

                            <text
                                fontSize="0.65em"
                                fontFamily="var(--font-sans)"
                                fill="var(--accents-8)"
                                style={{
                                    fontFeatureSettings: `"tnum", "ss04"`,
                                }}
                            >
                                <tspan
                                    x="1em"
                                    y={ypx(typefaceMetrics.baseLine) - 4}
                                    textAnchor="start"
                                >
                                    Baseline
                                </tspan>
                                <tspan
                                    x={parentWidth - 4}
                                    y={ypx(typefaceMetrics.baseLine) - 4}
                                    textAnchor="end"
                                >
                                    {typefaceMetrics.baseLine}
                                </tspan>

                                <tspan
                                    x="1em"
                                    y={ypx(typefaceMetrics.xHeight) - 4}
                                >
                                    X Height
                                </tspan>
                                <tspan
                                    x={parentWidth - 4}
                                    y={ypx(typefaceMetrics.xHeight) - 4}
                                    textAnchor="end"
                                >
                                    {typefaceMetrics.xHeight}
                                </tspan>

                                <tspan
                                    x="1em"
                                    y={ypx(typefaceMetrics.capHeight) - 4}
                                >
                                    Cap Height
                                </tspan>
                                <tspan
                                    x={parentWidth - 4}
                                    y={ypx(typefaceMetrics.capHeight) - 4}
                                    textAnchor="end"
                                >
                                    {typefaceMetrics.capHeight}
                                </tspan>

                                <tspan
                                    x="1em"
                                    y={ypx(typefaceMetrics.descender) - 4}
                                >
                                    Descender
                                </tspan>
                                <tspan
                                    x={parentWidth - 4}
                                    y={ypx(typefaceMetrics.descender) - 4}
                                    textAnchor="end"
                                >
                                    {typefaceMetrics.descender}
                                </tspan>

                                <tspan
                                    x="1em"
                                    y={ypx(typefaceMetrics.ascender) - 4}
                                >
                                    Ascender
                                </tspan>
                                <tspan
                                    x={parentWidth - 4}
                                    y={ypx(typefaceMetrics.ascender) - 4}
                                    textAnchor="end"
                                >
                                    {typefaceMetrics.ascender}
                                </tspan>
                            </text>
                        </g>
                        <path
                            fill="currentColor"
                            d={glyph.glyph
                                .getPath(xmin, glyphBaseline, glyphSize)
                                .toPathData(10)}
                        />
                    </svg>
                </div>

                <div
                    style={{
                        padding: "var(--grid-gap)",
                    }}
                >
                    <table
                        style={{
                            color: "var(--accents-8)",
                            borderCollapse: "collapse",
                        }}
                    >
                        <tbody>
                            <tr>
                                <th>Character</th>
                                <td
                                    style={{
                                        fontFamily: glyph.character
                                            ? selectedFont.typefaceFullName
                                            : "var(--font-sans)",
                                    }}
                                >
                                    {glyph.character ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{glyph.name}</td>
                            </tr>
                            <tr>
                                <th>Unicode</th>
                                <td style={{ textTransform: "uppercase" }}>
                                    {glyph.unicode ?? "-"}
                                </td>
                            </tr>
                            <tr>
                                <th>HTML</th>
                                <td>{glyph.html ?? "-"}</td>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <td>{glyph.id ?? "-"}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </aside>
    );
};
