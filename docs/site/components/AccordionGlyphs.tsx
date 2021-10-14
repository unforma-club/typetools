// @ts-ignore
import { useMemo, useState } from "react";
import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";
// import { useElementSize } from "libs/hooks";
import { TextMetrics } from "components/TextMetrics";

// interface CustomUlProps {
//     list: Array<any>;
//     fontFamily: string;
//     selectText: (e: string) => void;
// }

// const CustomUl = ({ list, fontFamily, selectText }: CustomUlProps) => {
//     const {
//         ref,
//         bounds: { width },
//     } = useElementSize();
//     const memoizedList = useMemo(() => list, [list]);

//     const divide = 18;
//     return (
//         <ul
//             // @ts-ignore
//             ref={ref}
//             style={{
//                 listStyle: "none",
//                 padding: 0,
//                 margin: 0,
//                 display: "flex",
//                 flexWrap: "wrap",
//                 justifyContent: "flex-end",
//                 gap: "calc(var(--grid-gap) / 2)",
//             }}
//         >
//             {memoizedList.slice(0, 108).map((item, i) => (
//                 <li
//                     key={i}
//                     onMouseOver={() => selectText(item.character)}
//                     style={{
//                         width: `calc(${
//                             width / divide
//                         }px - calc(var(--grid-gap) / 2))`,
//                         aspectRatio: "4 / 5.5",
//                         display: "inline-flex",
//                         flexDirection: "column",
//                         border: "1px solid",
//                         overflow: "hidden",
//                         cursor: "pointer",
//                     }}
//                 >
//                     <div
//                         style={{
//                             textTransform: "uppercase",
//                             fontFeatureSettings: `"ss04", "tnum"`,
//                             borderBottom: "1px solid",
//                             padding:
//                                 "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
//                             display: "inline-flex",
//                         }}
//                     >
//                         <span style={{ fontSize: "0.6em" }}>
//                             {item.unicode?.replace("0x", "")}
//                         </span>
//                     </div>
//                     <div
//                         data-name={item.name}
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             height: "100%",
//                             position: "relative",
//                             overflow: "hidden",
//                         }}
//                     >
//                         <div
//                             dangerouslySetInnerHTML={{
//                                 __html: item.character,
//                             }}
//                             style={{
//                                 fontFamily,
//                                 fontSize: "2em",
//                                 position: "absolute",
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -50%)",
//                             }}
//                         />
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// };

export const AccordionGlyphs = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    // @ts-ignore
    const [text, setText] = useState<string>("A");

    // const selectText = (e: string) => setText(e);

    return (
        <AccordionLayout {...props}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    alignItems: "flex-start",
                    gap: "var(--grid-gap)",
                }}
            >
                {selectedFont && (
                    <>
                        <div
                            style={{
                                position: "sticky",
                                top: "var(--header-height)",
                                borderRight: "1px solid",
                                borderLeft: "1px solid",
                            }}
                        >
                            <TextMetrics
                                font={selectedFont}
                                fontSize={400}
                                lineHeight={1.5}
                                use="hhea"
                                text={text ? text : "_"}
                            />
                        </div>

                        {/* <CustomUl
                            // @ts-ignore
                            list={selectedFont.characters}
                            fontFamily={selectedFont.typefaceFullName}
                            selectText={selectText}
                        /> */}
                    </>
                )}
            </div>
        </AccordionLayout>
    );
};
