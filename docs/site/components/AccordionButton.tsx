interface AccordionButtonProps {
    active: boolean;
    label: string;
    onClick: () => void;
}

export const AccordionButton = ({ label, onClick }: AccordionButtonProps) => {
    return (
        <button
            name={label}
            title={label}
            onClick={onClick}
            style={{
                appearance: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "sticky",
                top: 0,
                display: "block",
                fontSize: "inherit",
                fontFamily: "inherit",
                fontFeatureSettings: `"ss04", "tnum"`,
                padding: "0 calc(var(--grid-gap) * 4)",
                margin: 0,
                color: "currentcolor",
                overflow: "hidden",
                height: "var(--header-height)",
                zIndex: 1000,
            }}
        >
            <span
                style={{
                    fontSize: "4.5em",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    lineHeight: 0.8,
                }}
            >
                {label}
            </span>
        </button>
    );
};
