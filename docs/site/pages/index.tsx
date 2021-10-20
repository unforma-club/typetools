import styles from "components/accordion.module.scss";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { ComponentType } from "react";
import type { BaseAccordion } from "components/AccordionLayout";
import NextHead from "next/head";
import { useEffect, useRef, useState } from "react";
import { SITE_DATA, META_DATA } from "libs/constants";
import { useMediaQuery } from "libs/hooks";
import { useFonts } from "libs/context/ContextFonts";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { AccordionIndex } from "components/AccordionIndex";
import { AccordionGlyphs } from "components/AccordionGlyphs";
import { AccordionMetrics } from "components/AccordionMetrics";
import { AccordionTypetester } from "components/AccordionTypetester";

interface Accordion {
    label: "Typewriter" | "Glyph" | "Vertical Metric" | "Info";
    isActive: boolean;
    component: ComponentType<BaseAccordion>;
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page({ deviceType }: PageProps) {
    const { active: activeMedia } = useMediaQuery();
    const [accordion, setAccordion] = useState<Array<Accordion>>([
        {
            label: "Info",
            isActive: false,
            component: (props: BaseAccordion) => <AccordionIndex {...props} />,
        },
        {
            label: "Glyph",
            isActive: false,
            component: (props: BaseAccordion) => <AccordionGlyphs {...props} />,
        },
        {
            label: "Vertical Metric",
            isActive: true,
            component: (props: BaseAccordion) => (
                <AccordionMetrics {...props} />
            ),
        },
        {
            label: "Typewriter",
            isActive: false,
            component: (props: BaseAccordion) => (
                <AccordionTypetester {...props} />
            ),
        },
    ]);

    const { selectedFont } = useFonts();
    const refParent = useRef<HTMLLIElement>(null);
    useEffect(() => {
        /**
         * Scroll to top of the page after 400ms
         */
        const timeout = setTimeout(() => {
            if (!refParent.current) return;
            refParent.current.scrollIntoView({
                block: "start",
                behavior: "smooth",
                inline: "start",
            });
        }, 400);

        return () => clearTimeout(timeout);
    }, [accordion, selectedFont]);

    const isMobile = deviceType === "mobile" || activeMedia === "mobile";

    return (
        <>
            <NextHead>
                <title>{META_DATA.title}</title>
                <meta name="title" content={META_DATA.title} />
                <meta name="description" content={META_DATA.description} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={META_DATA.url} />
                <meta property="og:title" content={META_DATA.title} />
                <meta
                    property="og:description"
                    content={META_DATA.description}
                />
                <meta property="og:image" content={META_DATA.image} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={META_DATA.url} />
                <meta property="twitter:title" content={META_DATA.title} />
                <meta
                    property="twitter:description"
                    content={META_DATA.description}
                />
                <meta property="twitter:image" content={META_DATA.image} />
            </NextHead>

            {isMobile && (
                <div
                    style={{
                        padding: "calc(var(--grid-gap) * 2)",
                        fontFamily: "var(--font-display)",
                        lineHeight: 1.1,
                    }}
                >
                    <p
                        style={{
                            fontSize: "1.5em",
                            hyphens: "auto",
                            margin: 0,
                            fontWeight: 500,
                        }}
                    >
                        Dear,
                        <br />
                        Our Beloved User.
                        <br />
                        <br />
                        The mobile version is still on progress and we don't
                        know when it will be done. We are sorry, our developers
                        team are too busy.
                        <br />
                        <br />
                        Please visit the website on a bigger screen, so you can
                        get fully experience of our {SITE_DATA.name}.
                        <br />
                        <br />
                        Thanks,
                        <br />
                        <a
                            href={SITE_DATA.author.url}
                            rel="noopener"
                            target="_blank"
                        >
                            {SITE_DATA.author.name} Team.
                        </a>
                    </p>
                </div>
            )}

            {!isMobile && <Header />}
            {!isMobile && (
                <main>
                    <ul className={styles.container}>
                        {accordion
                            // Sorting by label length for ladder ui looks
                            .sort((a, b) => {
                                if (a.label.length < b.label.length) return -1;
                                if (a.label.length > b.label.length) return 1;
                                else return 0;
                            })
                            .map((item, i) => {
                                const { component: Component, isActive } = item;
                                return (
                                    <li
                                        key={i}
                                        ref={isActive ? refParent : null}
                                        className={styles.list}
                                        data-active={isActive}
                                    >
                                        <Component
                                            {...item}
                                            // buttonStyle={{
                                            //     backgroundColor: `var(--accents-${
                                            //         i + 2
                                            //     })`,
                                            // }}
                                            onClick={() => {
                                                setAccordion((prev) => {
                                                    const prevActive =
                                                        prev.find(
                                                            (item) =>
                                                                item.isActive
                                                        );
                                                    if (!prevActive)
                                                        return prev;
                                                    prevActive.isActive = false;
                                                    prev[i].isActive = true;
                                                    return [...prev];
                                                });
                                            }}
                                        />
                                    </li>
                                );
                            })}
                    </ul>
                </main>
            )}

            <Footer />
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{
    deviceType: "desktop" | "mobile";
}> = async (context) => {
    const UA = context.req.headers["user-agent"];
    if (!UA) return { props: { deviceType: "desktop" } };
    const isMobile = Boolean(
        UA.match(
            /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
    );
    return {
        props: {
            deviceType: isMobile ? "mobile" : "desktop",
        },
    };
};
