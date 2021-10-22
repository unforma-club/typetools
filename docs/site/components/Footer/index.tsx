import styles from "./footer.module.scss";
import pJson from "../../package.json";
import { SITE_DATA } from "libs/constants";

export const Footer = () => {
    return (
        <footer className={styles.container}>
            <div
                style={{
                    fontSize: "0.7em",
                }}
            >
                &copy;{SITE_DATA.years.join("-")}{" "}
                <a href={SITE_DATA.author.url} target="_blank" rel="noopener">
                    {SITE_DATA.author.name}
                </a>
                . All typefaces rights of their respective owners.
            </div>

            <div
                style={{
                    fontSize: "0.7em",
                }}
            >
                Version {pJson.version}
            </div>
        </footer>
    );
};
