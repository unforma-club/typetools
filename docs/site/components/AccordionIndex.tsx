import { AccordionLayout, BaseAccordion } from "components/AccordionLayout";
import { useFonts } from "libs/context/ContextFonts";

interface InfoProps {
    label: string;
    value: string;
}

const Info = ({ label, value }: InfoProps) => {
    return (
        <li
            style={{
                display: "grid",
                gridTemplateColumns: "10em 1fr",
                fontFeatureSettings: `"ss04", "tnum"`,
                fontFamily: "var(--font-sans)",
                fontSize: "0.8em",
            }}
        >
            <span>{label}</span>
            <span style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {value ? value : "-"}
            </span>
        </li>
    );
};

export const AccordionIndex = (props: BaseAccordion) => {
    const { selectedFont } = useFonts();
    return (
        <AccordionLayout {...props}>
            {selectedFont && (
                <>
                    <ul
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            position: "relative",
                        }}
                    >
                        <Info
                            label="Family"
                            value={selectedFont.typefaceFamily}
                        />
                        <Info
                            label="Full Name"
                            value={selectedFont.typefaceFullName}
                        />
                        <Info
                            label="Version"
                            value={selectedFont.typefaceInfo.version}
                        />
                        <Info
                            label="Designer"
                            value={selectedFont.typefaceInfo.designer.value}
                        />
                        <Info
                            label="Designer Url"
                            value={selectedFont.typefaceInfo.designer.url}
                        />
                        <Info
                            label="Manufacturer"
                            value={selectedFont.typefaceInfo.manufacturer.value}
                        />
                        <Info
                            label="Manufacturer Url"
                            value={selectedFont.typefaceInfo.manufacturer.url}
                        />
                        <Info
                            label="License"
                            value={selectedFont.typefaceInfo.license.value}
                        />
                        <Info
                            label="License Url"
                            value={selectedFont.typefaceInfo.license.url}
                        />
                        <Info
                            label="Trademark"
                            value={selectedFont.typefaceInfo.trademark}
                        />
                        <Info
                            label="Copyright"
                            value={selectedFont.typefaceInfo.copyright}
                        />
                    </ul>
                </>
            )}
        </AccordionLayout>
    );
};
