import { useFonts } from "libs/context/ContextFonts";
import { AccordionButton } from "./AccordionButton";
import { AccordionLayout, BaseAccordion } from "./AccordionLayout";

const validURL = (str: string) => {
    const urlPattern =
        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return !!urlPattern.exec(str);
};
interface InfoProps {
    label: string;
    value: string;
}

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
            <span
                style={{
                    width: "6em",
                    border: "1px solid",
                    padding:
                        "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flexShrink: 0,
                    fontWeight: "bold",
                }}
            >
                {label}
            </span>
            <span
                style={{
                    border: "1px solid",
                    padding:
                        "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    flexShrink: 0,
                    backgroundColor: "var(--accents-3)",
                    color: "var(--accents-14)",
                }}
            >
                &rarr;
            </span>

            <ul
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    // flexFlow: "column wrap",
                    alignItems: "baseline",
                    alignContent: "baseline",
                    gap: "calc(var(--grid-gap) / 2)",
                    position: "relative",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    // maxHeight: "18em",
                    // minWidth: "18em",
                    // maxWidth: "22em",
                    width: "100%",
                }}
            >
                {value || value !== "-" ? (
                    value.split(", ").map((v, i) => {
                        return (
                            <li
                                key={i}
                                style={{
                                    position: "relative",
                                    border: "1px solid",
                                    padding:
                                        "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
                                    backgroundColor: validURL(v)
                                        ? "var(--accents-3)"
                                        : `var(--accents-1)`,
                                    color: "currentcolor",
                                    // color: validURL(v)
                                    //     ? "var(--accents-1)"
                                    //     : `var(--accents-14)`,
                                    maxWidth: "50vw",
                                }}
                            >
                                {validURL(v) ? (
                                    <span>
                                        <a
                                            href={v}
                                            target="_blank"
                                            rel="noopener noreferer"
                                        >
                                            {v}
                                        </a>
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            hyphens: "auto",
                                            wordBreak: "break-word",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {v || "-"}
                                    </span>
                                )}

                                {/* <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        backgroundColor: "var(--accents-14)",
                                        color: "var(--accents-1)",
                                        aspectRatio: "1 / 1",
                                        width: "calc(var(--grid-gap) * 1.75)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                        flexShrink: 0,
                                    }}
                                >
                                    <span style={{ fontSize: "0.5em" }}>
                                        {i + 1}
                                    </span>
                                </div> */}
                            </li>
                        );
                    })
                ) : (
                    <li
                        style={{
                            display: "inline-block",
                            border: "1px solid",
                            padding:
                                "calc(var(--grid-gap) / 2) calc(var(--grid-gap) / 1)",
                            margin: "0 -1px -1px 0",
                            flexShrink: 0,
                            minWidth: "2em",
                            textAlign: "center",
                        }}
                    >
                        -
                    </li>
                )}
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
                // minWidth: "28em",
                // maxWidth: "30em",
                // borderRight: "1px solid",
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
        { label: "Family", value: selectedFont.typefaceFamily },
        { label: "Name", value: selectedFont.typefaceFullName },
        { label: "File", value: selectedFont.fileName },
        { label: "Type", value: selectedFont.fileType },
        {
            label: "Size",
            value: `${Math.round(selectedFont.fileSize / 1000)} kb`,
        },
        { label: "Version", value: selectedFont.typefaceInfo.version },
        { label: "Style", value: selectedFont.typefaceStyle },
        { label: "Weight", value: selectedFont.typefaceWeight.toString() },
        {
            label: "Variable",
            value: selectedFont.typefaceVariable ? "Support" : "-",
        },
        {
            label: "Instances",
            value: selectedFont.typefaceVariable
                ? selectedFont.typefaceVariable.instances
                    ? selectedFont.typefaceVariable.instances
                          .map((item) => `${item.name}`)
                          .join(", ")
                    : "-"
                : "-",
        },
        {
            label: "Features",
            value: selectedFont.typefaceFeatures
                .map((item) => item.tag)
                .join(", "),
        },
        { label: "Tables", value: selectedFont.typefaceTables.join(", ") },
        {
            label: "Designer",
            value: `${selectedFont.typefaceInfo.designer.value}, ${selectedFont.typefaceInfo.designer.url}`,
        },
        {
            label: "Manufacturer",
            value: `${
                selectedFont.typefaceInfo.manufacturer.value
                    ? selectedFont.typefaceInfo.manufacturer.value
                    : "-"
            }, ${
                selectedFont.typefaceInfo.manufacturer.url
                    ? selectedFont.typefaceInfo.manufacturer.url
                    : "-"
            }`,
        },
        {
            label: "License",
            value: `${selectedFont.typefaceInfo.license.value}, ${selectedFont.typefaceInfo.license.url}`,
        },
        {
            label: "Trademark",
            value: selectedFont.typefaceInfo.trademark
                ? selectedFont.typefaceInfo.trademark
                : "-",
        },
        { label: "Copyright", value: selectedFont.typefaceInfo.copyright },
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
                <div
                    style={{
                        // display: "grid",
                        // gridTemplateColumns: "repeat(4, 1fr)",
                        // display: "flex",
                        // flexDirection: "column",
                        // gap: "calc(var(--grid-gap) / 2)",
                        fontFeatureSettings: `"ss01", "ss04", "tnum"`,
                    }}
                >
                    <InfoWrapper list={infos} />
                </div>
            </AccordionLayout>
        </>
    );
};
