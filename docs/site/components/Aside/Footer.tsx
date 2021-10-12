import pJson from "../../package.json";

export const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer
            style={{
                position: "absolute",
                bottom: 0,
                padding: "calc(var(--grid-gap) * 3)",
                width: "100%",
            }}
        >
            <div
                style={{
                    fontSize: "0.8em",
                    color: "var(--accents-8)",
                    marginBottom: "1em",
                }}
            >
                Version {pJson.version}
            </div>
            <div
                style={{
                    fontSize: "0.8em",
                    color: "var(--accents-8)",
                    lineHeight: 1,
                }}
            >
                &copy;{year}{" "}
                <a href="https://unforma.club" target="_blank" rel="noopener">
                    Unforma™Club
                </a>
                . All rights reserved.
            </div>
        </footer>
    );
};
