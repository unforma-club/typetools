import { useMemo } from "react";
import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";
import { useElementSize } from "libs/hooks";

interface CustomUlProps {
    list: Array<any>;
    fontFamily: string;
}

const CustomUl = ({ list, fontFamily }: CustomUlProps) => {
    const {
        ref,
        bounds: { width },
    } = useElementSize();
    const memoizedList = useMemo(() => list, [list]);

    const divide = 18;
    return (
        <ul
            // @ts-ignore
            ref={ref}
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: "calc(var(--grid-gap) / 2)",
            }}
        >
            {memoizedList.map((item, i) => (
                <li
                    key={i}
                    style={{
                        width: `calc(${
                            width / divide
                        }px - calc(var(--grid-gap) / 2))`,
                        aspectRatio: "4 / 5.5",
                        display: "inline-flex",
                        flexDirection: "column",
                        border: "1px solid",
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            textTransform: "uppercase",
                            fontFeatureSettings: `"ss04", "tnum"`,
                            borderBottom: "1px solid",
                            padding:
                                "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
                            display: "inline-flex",
                        }}
                    >
                        <span style={{ fontSize: "0.6em" }}>
                            {item.unicode?.replace("0x", "")}
                        </span>
                    </div>
                    <div
                        data-name={item.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <div
                            dangerouslySetInnerHTML={{
                                __html: item.character,
                            }}
                            style={{
                                fontFamily,
                                fontSize: "2em",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export const AccordionGlyphs = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();

    return (
        <AccordionLayout {...props}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
                <div>
                    <div
                        style={{
                            position: "sticky",
                            top: "var(--header-height)",
                        }}
                    >
                        Inspector
                    </div>
                </div>
                {selectedFont && (
                    <CustomUl
                        // @ts-ignore
                        list={selectedFont.characters}
                        fontFamily={selectedFont.typefaceFullName}
                    />
                )}
            </div>
        </AccordionLayout>
    );
};
