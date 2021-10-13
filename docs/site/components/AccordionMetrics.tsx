import styles from "./accordion-metrics.module.scss";
import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";
import { TextMetrics } from "components/TextMetrics";
import { useState } from "react";
import { Slider } from "./Slider";

export const AccordionMetrics = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    const [fontSize, setFontSize] = useState(180);
    const [lineHeight, setLineHeight] = useState(1.5);
    return (
        <AccordionLayout {...props}>
            {selectedFont && (
                <>
                    <ul
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gap: "var(--grid-gap)",
                            fontFeatureSettings: `"ss04", "tnum"`,
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            position: "absolute",
                            top: 0,
                            left: "calc(var(--grid-gap) * 4)",
                            right: "calc(var(--grid-gap) * 4)",
                            zIndex: 10,
                        }}
                    >
                        <li>
                            <Slider
                                label="Font Size"
                                min={90}
                                max={200}
                                step={1}
                                value={fontSize}
                                defaultValue={180}
                                onChange={(e) => setFontSize(e)}
                                onDoubleClick={(e) => setFontSize(e)}
                            />
                        </li>
                        <li>
                            <Slider
                                label="Line Height"
                                min={0.8}
                                max={3}
                                step={0.1}
                                value={lineHeight}
                                defaultValue={1.5}
                                onChange={(e) => setLineHeight(e)}
                                onDoubleClick={(e) => setLineHeight(e)}
                            />
                        </li>
                    </ul>
                    <div className={styles.metrics}>
                        <TextMetrics
                            font={selectedFont}
                            fontSize={fontSize}
                            lineHeight={lineHeight}
                            use="hhea"
                        />
                        <TextMetrics
                            font={selectedFont}
                            fontSize={fontSize}
                            lineHeight={lineHeight}
                            use="win"
                        />
                        <TextMetrics
                            font={selectedFont}
                            fontSize={fontSize}
                            lineHeight={lineHeight}
                            use="typo"
                        />
                    </div>
                </>
            )}
        </AccordionLayout>
    );
};
