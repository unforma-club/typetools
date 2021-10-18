import styles from "./footer.module.scss";
import pJson from "../../package.json";
import { SITE_DATA } from "libs/constants";

export const Footer = () => {
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
                    &copy;{SITE_DATA.years.join("-")}{" "}
                    <a
                        href={SITE_DATA.author.url}
                        target="_blank"
                        rel="noopener"
                    >
                        {SITE_DATA.author.name}
                    </a>
                    .
                </div>
            </div>
        </footer>
    );
};
