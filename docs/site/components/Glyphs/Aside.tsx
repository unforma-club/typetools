import styles from "./glyph.module.scss";
import { NewGlyph } from "@unforma-club/typetools";
import { useFonts } from "libs/context/ContextFonts";
import { GlyphGuideLine, GlyphPath } from "./GlyphPath";

interface GlyphsAsideProps {
    glyph: NewGlyph;
    glyphsLength: number;
    charsLength: number;
}

export const GlyphsAside = ({ glyph }: GlyphsAsideProps) => {
    const { selectedFont } = useFonts();

    return (
        <aside className={styles.aside}>
            <div className={styles.glyph_inspector}>
                <div
                    style={{
                        position: "relative",
                        borderBottom: "1px solid",
                        // padding: "var(--grid-gap)",
                    }}
                >
                    <svg
                        width="100%"
                        // height="100%"
                        viewBox={glyph.svg.viewBox}
                        fill="currentColor"
                        style={{ userSelect: "none", display: "block" }}
                    >
                        <g>
                            <GlyphGuideLine
                                y={glyph.svg.ascender}
                                width={glyph.svg.baseWidth}
                            />
                            <GlyphGuideLine
                                y={glyph.svg.descender}
                                width={glyph.svg.baseWidth}
                            />
                            <GlyphGuideLine
                                y={glyph.svg.baseLine}
                                width={glyph.svg.baseWidth}
                            />
                            <GlyphGuideLine
                                y={glyph.svg.xHeight}
                                width={glyph.svg.baseWidth}
                                type="dash"
                            />
                            <GlyphGuideLine
                                y={glyph.svg.capHeight}
                                width={glyph.svg.baseWidth}
                            />

                            {/* <text
                                fontSize="0.65em"
                                fontFamily="var(--font-sans)"
                                fill="var(--accents-8)"
                                style={{
                                    fontFeatureSettings: `"tnum", "ss04"`,
                                }}
                            >
                                <tspan
                                    x="1em"
                                    y={glyph.svg.baseLine - 4}
                                    textAnchor="start"
                                >
                                    Baseline
                                </tspan>
                                <tspan
                                    x={320 - 4}
                                    y={glyph.svg.baseLine - 4}
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
                            </text> */}
                        </g>
                        <GlyphPath path={glyph.svg.path} />
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
