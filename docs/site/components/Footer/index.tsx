import pJson from "../../package.json";

export const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer
            style={{
                height: "var(--header-height)",
                padding: "0 calc(var(--grid-gap) * 4)",
                // display: "flex",
                // alignItems: "center",
                backgroundColor: "var(--accents-1)",
                zIndex: 1001,
                position: "relative",
            }}
        >
            <div>
                <div
                    style={{
                        fontSize: "0.6em",
                        color: "var(--accents-8)",
                        marginBottom: "calc(var(--grid-gap) / 2)",
                    }}
                >
                    Version {pJson.version}
                </div>
                <div
                    style={{
                        fontSize: "0.6em",
                        color: "var(--accents-8)",
                        lineHeight: 1,
                    }}
                >
                    &copy;{year}{" "}
                    <a
                        href="https://unforma.club"
                        target="_blank"
                        rel="noopener"
                    >
                        Unforma™Club
                    </a>
                    . All rights reserved.
                </div>
            </div>
        </footer>
    );
};
