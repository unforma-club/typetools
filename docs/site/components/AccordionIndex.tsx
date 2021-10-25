import type { CSSProperties, FC } from "react";
import { useFonts } from "libs/context/ContextFonts";
import { AccordionButton } from "./AccordionButton";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";

const validURL = (str: string) => {
    const urlPattern =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    const isValid = !!urlPattern.exec(str);
    return str && isValid ? (
        <a
            href={str}
            target="_blank"
            rel="noopener noreferer"
            style={{ textDecoration: "underline" }}
        >
            {str}
        </a>
    ) : str ? (
        str
    ) : (
        "-"
    );
};
interface InfoProps {
    label: string;
    value: string | JSX.Element | Array<JSX.Element>;
}

interface BoxProps {
    width?: "fluid" | "fix";
    style?: CSSProperties;
}

const Box: FC<BoxProps> = (props) => {
    const { children, width = "fluid", style } = props;

    return (
        <span
            style={{
                width: width === "fix" ? "8em" : "auto",
                border: "1px solid",
                flexShrink: 0,
                height: "1.75em",
                display: "flex",
                alignItems: "center",
                padding: "0 var(--grid-gap)",
                maxWidth: "50vw",
                fontFeatureSettings: !style?.fontFeatureSettings
                    ? `"ss01", "ss04", "tnum"`
                    : "",
                ...style,
            }}
        >
            <span
                style={{
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: width === "fix" ? "bold" : "initial",
                }}
            >
                {children}
            </span>
        </span>
    );
};

const Info2 = ({ label, value }: InfoProps) => {
    return (
        <li
            style={{
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                gap: "calc(var(--grid-gap) / 2)",
            }}
        >
            <Box width="fix">{label}</Box>
            <Box>&rarr;</Box>

            <ul
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                    alignContent: "baseline",
                    gap: "calc(var(--grid-gap) / 2)",
                    position: "relative",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                }}
            >
                <li
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "calc(var(--grid-gap) / 2)",
                    }}
                >
                    {value}
                </li>
            </ul>
        </li>
    );
};

interface InfoWrapperProps {
    list: Array<InfoProps>;
}

const InfoWrapper = ({ list }: InfoWrapperProps) => {
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                height: "100%",
                gap: "calc(var(--grid-gap) / 2)",
                width: "100%",
                position: "relative",
            }}
        >
            {list.map((item, i) => (
                <Info2 key={i} {...item} />
            ))}
        </ul>
    );
};

export const AccordionIndex = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();

    const infos: Array<InfoProps> = [
        {
            label: "Family",
            value: <Box>{selectedFont.typefaceFamily}</Box>,
        },
        { label: "Name", value: <Box>{selectedFont.typefaceFullName}</Box> },
        { label: "File", value: <Box>{selectedFont.fileName}</Box> },
        { label: "Type", value: <Box>{selectedFont.fileType}</Box> },
        {
            label: "Size",
            value: (
                <Box
                    style={{
                        backgroundColor:
                            Math.round(selectedFont.fileSize / 1000) > 200
                                ? "var(--geist-ufc-color)"
                                : "initial",
                        color:
                            Math.round(selectedFont.fileSize / 1000) > 200
                                ? "var(--accents-1)"
                                : "initial",
                    }}
                >
                    {Math.round(selectedFont.fileSize / 1000)} kb
                </Box>
            ),
        },
        {
            label: "Version",
            value: selectedFont.typefaceInfo.version
                .split(";")
                .map((item, i) => <Box key={i}>{item}</Box>),
        },
        { label: "Style", value: <Box>{selectedFont.typefaceStyle}</Box> },
        {
            label: "Weight",
            value: <Box>{selectedFont.typefaceWeight}</Box>,
        },
        {
            label: "Variable",
            value: <Box>{selectedFont.typefaceVariable ? "Support" : "-"}</Box>,
        },
        {
            label: "Instances",
            value: selectedFont.typefaceVariable ? (
                selectedFont.typefaceVariable.instances ? (
                    selectedFont.typefaceVariable.instances
                        .sort((a, b) => {
                            const aItalic = a.name.includes("Italic");
                            const bItalic = b.name.includes("Italic");
                            return aItalic === bItalic ? 0 : aItalic ? 1 : -1;
                        })
                        .map((item, i) => {
                            return (
                                <Box
                                    key={i}
                                    style={{
                                        fontFamily:
                                            selectedFont.typefaceFullName,
                                        fontVariationSettings: JSON.stringify(
                                            item.coordinates,
                                            null,
                                            2
                                        ).replace(/[{:}]/g, ""),
                                    }}
                                >
                                    {item.name}
                                </Box>
                            );
                        })
                ) : (
                    <Box>-</Box>
                )
            ) : (
                <Box>-</Box>
            ),
        },
        {
            label: "Features",
            value: selectedFont.typefaceFeatures.map((item, i) => (
                <Box key={i}>{item.tag}</Box>
            )),
        },
        {
            label: "Tables",
            value: selectedFont.typefaceTables.map((item, i) => (
                <Box key={i}>{item}</Box>
            )),
        },
        {
            label: "Designer",
            value: (
                <>
                    {selectedFont.typefaceInfo.designer.value
                        .split(", ")
                        .map((item, i) => (
                            <Box key={i}>{item}</Box>
                        ))}
                    <Box>
                        {validURL(selectedFont.typefaceInfo.designer.url)}
                    </Box>
                </>
            ),
        },
        {
            label: "Manufacturer",
            value: (
                <>
                    <Box>{selectedFont.typefaceInfo.manufacturer.value}</Box>
                    <Box>
                        {validURL(selectedFont.typefaceInfo.manufacturer.url)}
                    </Box>
                </>
            ),
        },
        {
            label: "License",
            value: (
                <>
                    <Box>
                        {selectedFont.typefaceInfo.license.value
                            ? selectedFont.typefaceInfo.license.value
                            : "-"}
                    </Box>
                    <Box>{validURL(selectedFont.typefaceInfo.license.url)}</Box>
                </>
            ),
        },
        {
            label: "Trademark",
            value: (
                <Box>
                    {selectedFont.typefaceInfo.trademark
                        ? selectedFont.typefaceInfo.trademark
                        : "-"}
                </Box>
            ),
        },
        {
            label: "Copyright",
            value: (
                <Box>
                    {selectedFont.typefaceInfo.copyright
                        ? selectedFont.typefaceInfo.copyright
                        : "-"}
                </Box>
            ),
        },
    ];

    return (
        <>
            <AccordionButton
                active={props.isActive}
                label={props.label}
                onClick={props.onClick}
                style={{ ...props.buttonStyle }}
            />

            <AccordionLayout {...props}>
                <InfoWrapper list={infos} />
            </AccordionLayout>
        </>
    );
};
