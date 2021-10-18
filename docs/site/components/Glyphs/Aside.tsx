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
        <aside>
            <div
                style={{
                    position: "relative",
                    width: "calc(33.33vw - 4em - var(--grid-gap))",
                    border: "1px solid",
                    padding: "calc(var(--grid-gap) * 4) 0",
                }}
            >
                <div
                    ref={ref}
                    style={{
                        height: "calc(100vh - calc(var(--header-height) * 10))",
                        position: "relative",
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
                                stroke="var(--accents-3)"
                                strokeWidth="1"
                                strokeDasharray="2 2"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.capHeight)}
                                y2={ypx(typefaceMetrics.capHeight)}
                                stroke="var(--accents-3)"
                                strokeWidth="1"
                                strokeDasharray="2 2"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.xHeight)}
                                y2={ypx(typefaceMetrics.xHeight)}
                                stroke="var(--accents-3)"
                                strokeWidth="1"
                                strokeDasharray="2 2"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.baseLine)}
                                y2={ypx(typefaceMetrics.baseLine)}
                                stroke="var(--accents-3)"
                                strokeWidth="1"
                            />
                            <line
                                x1={0}
                                x2={parentWidth}
                                y1={ypx(typefaceMetrics.descender)}
                                y2={ypx(typefaceMetrics.descender)}
                                stroke="var(--accents-3)"
                                strokeWidth="1"
                                strokeDasharray="2 2"
                            />

                            <text
                                fontSize="0.6em"
                                fontFamily="var(--font-sans)"
                                fill="var(--accents-8)"
                                style={{
                                    fontFeatureSettings: `"tnum"`,
                                }}
                            >
                                <tspan
                                    x="6"
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
                                    x="6"
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
                                    x="6"
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
                                    x="6"
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
                                    x="6"
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
            </div>

            <div>
                <table style={{ color: "var(--accents-8)" }}>
                    <tbody>
                        <tr>
                            <td>Character</td>
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
                            <td>Name</td>
                            <td>{glyph.name}</td>
                        </tr>
                        <tr>
                            <td>Unicode</td>
                            <td style={{ textTransform: "uppercase" }}>
                                {glyph.unicode ?? "-"}
                            </td>
                        </tr>
                        <tr>
                            <td>HTML</td>
                            <td>{glyph.html ?? "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </aside>
    );
};
