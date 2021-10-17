import { NewGlyph } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { useMeasure } from "libs/hooks";
import { useSVGMetrics } from "libs/use-svg-metrics";

interface GlyphsAsideProps {
    glyph: NewGlyph;
    glyphsLength: number;
    charsLength: number;
}

export const GlyphsAside = ({
    glyph,
    glyphsLength,
    charsLength,
}: GlyphsAsideProps) => {
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
                ref={ref}
                style={{ width: "calc(33.33vw - 4em)", position: "relative" }}
            >
                <div
                    style={{
                        border: "1px solid",
                        // borderRadius: "var(--grid-gap)",
                        height: "calc(100vh - calc(var(--header-height) * 10))",
                        overflow: "hidden",
                    }}
                >
                    <svg
                        width={parentWidth}
                        height={parentHeight}
                        viewBox={`0 0 ${parentWidth} ${parentHeight}`}
                        fill="currentColor"
                        style={{ userSelect: "none" }}
                    >
                        <line
                            x1={0}
                            x2={parentWidth}
                            y1={ypx(typefaceMetrics.ascender).toString()}
                            y2={ypx(typefaceMetrics.ascender).toString()}
                            stroke="var(--accents-3)"
                            strokeWidth="1"
                        />
                        <line
                            x1={0}
                            x2={parentWidth}
                            y1={ypx(typefaceMetrics.capHeight).toString()}
                            y2={ypx(typefaceMetrics.capHeight).toString()}
                            stroke="var(--accents-3)"
                            strokeWidth="1"
                        />
                        <line
                            x1={0}
                            x2={parentWidth}
                            y1={ypx(typefaceMetrics.xHeight).toString()}
                            y2={ypx(typefaceMetrics.xHeight).toString()}
                            stroke="var(--accents-3)"
                            strokeWidth="1"
                        />
                        <line
                            x1={0}
                            x2={parentWidth}
                            y1={ypx(typefaceMetrics.baseLine).toString()}
                            y2={ypx(typefaceMetrics.baseLine).toString()}
                            stroke="var(--accents-3)"
                            strokeWidth="1"
                        />
                        <line
                            x1={0}
                            x2={parentWidth}
                            y1={ypx(typefaceMetrics.descender).toString()}
                            y2={ypx(typefaceMetrics.descender).toString()}
                            stroke="var(--accents-3)"
                            strokeWidth="1"
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
                                y={ypx(typefaceMetrics.baseLine).toString()}
                            >
                                Baseline
                            </tspan>
                            <tspan
                                x="6"
                                y={ypx(typefaceMetrics.xHeight).toString()}
                            >
                                X Height
                            </tspan>
                            <tspan
                                x="6"
                                y={ypx(typefaceMetrics.capHeight).toString()}
                            >
                                Cap Height
                            </tspan>
                            <tspan
                                x="6"
                                y={ypx(typefaceMetrics.descender).toString()}
                            >
                                Descender
                            </tspan>
                            <tspan
                                x="6"
                                y={ypx(typefaceMetrics.ascender).toString()}
                            >
                                Ascender
                            </tspan>
                        </text>
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
                <table>
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
                        <tr>
                            <td>Glyphs</td>
                            <td>{glyphsLength}</td>
                        </tr>
                        <tr>
                            <td>Characters</td>
                            <td>{charsLength}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </aside>
    );
};
