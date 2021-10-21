import styles from "./accordion-metrics.module.scss";
import { useFonts } from "libs/context/ContextFonts";
import { TextMetrics } from "components/TextMetrics";
import { useState } from "react";
import { Slider } from "./Slider";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";

export const AccordionMetrics = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    const [fontSize, setFontSize] = useState(180);
    const [lineHeight, setLineHeight] = useState(1.5);
    return (
        <AccordionLayout
            {...props}
            navigation={
                <ul
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(6, 1fr)",
                        gap: "calc(var(--grid-gap) * 4)",
                        fontFeatureSettings: `"ss04", "tnum"`,
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        height: "100%",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <li>
                        <Slider
                            label="Size"
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
                            label="Leading"
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
            }
        >
            <div className={styles.metrics}>
                <TextMetrics
                    font={selectedFont}
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    title
                    info
                    guideBar
                    use="hhea"
                />
                <TextMetrics
                    font={selectedFont}
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    title
                    info
                    guideBar
                    use="win"
                />
                <TextMetrics
                    font={selectedFont}
                    fontSize={fontSize}
                    lineHeight={lineHeight}
                    title
                    info
                    guideBar
                    use="typo"
                />
            </div>
        </AccordionLayout>
    );
};
