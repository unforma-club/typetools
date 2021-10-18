import styles from "./footer.module.scss";
import pJson from "../../package.json";

export const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className={styles.container}>
            <div>
                <div
                    style={{
                        fontSize: "0.65em",
                        color: "var(--accents-8)",
                        marginBottom: "calc(var(--grid-gap) / 2)",
                    }}
                >
                    Version {pJson.version}
                </div>
                <div
                    style={{
                        fontSize: "0.65em",
                        color: "var(--accents-8)",
                        lineHeight: 1,
                    }}
                >
                    &copy;2020-{year}{" "}
                    <a
                        href="https://unforma.club"
                        target="_blank"
                        rel="noopener"
                    >
                        Unforma®Club
                    </a>
                    . All rights reserved.
                </div>
            </div>
        </footer>
    );
};
