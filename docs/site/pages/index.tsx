import styles from "components/accordion.module.scss";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ComponentType } from "react";
import { AccordionLayout } from "components/AccordionLayout";
import NextHead from "next/head";
import NextDynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "libs/hooks";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { AccordionMetrics } from "components/AccordionMetrics";
import { AccordionTypetester } from "components/AccordionTypetester";
import { AccordionButton } from "components/AccordionButton";
import { useFonts } from "libs/context/ContextFonts";
import { AccordionIndex } from "components/AccordionIndex";

const AccordionGlyphs = NextDynamic(
    () => import("components/AccordionGlyphs"),
    { ssr: false, loading: () => <div>Loading Glyphs...</div> }
);

interface Accordion {
    label: "Typetester" | "Glyph" | "Metric" | "Info";
    isActive: boolean;
    component: ComponentType;
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Page({ deviceType }: PageProps) {
    const meta = {
        title: "Typetools by Unforma™Club",
        description: "Typetools by Unforma™Club",
    };
    const { active: activeMedia } = useMediaQuery();
    const [accordion, setAccordion] = useState<Array<Accordion>>([
        {
            label: "Info",
            isActive: false,
            component: () => <AccordionIndex />,
        },
        {
            label: "Glyph",
            isActive: false,
            component: () => <AccordionGlyphs />,
        },
        {
            label: "Metric",
            isActive: false,
            component: () => <AccordionMetrics />,
        },
        {
            label: "Typetester",
            isActive: true,
            component: () => <AccordionTypetester />,
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

    return (
        <>
            <NextHead>
                <title>{meta.title}</title>
                <meta name="title" content={meta.title} />
                <meta name="description" content={meta.description} />
            </NextHead>

            {deviceType === "mobile" || activeMedia === "mobile" ? (
                <>
                    <div
                        style={{
                            padding: "var(--grid-gap)",
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
                            know when it will be done. We are sorry, our
                            developers team are too busy.
                            <br />
                            <br />
                            Please visit the website on a bigger screen, so you
                            can get fully experience of our Typetools.
                            <br />
                            <br />
                            Thanks,
                            <br />
                            <a
                                href="https://unforma.club"
                                rel="noopener"
                                target="_blank"
                            >
                                Unforma®Club Team.
                            </a>
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <Header />
                    <main>
                        <ul className={styles.container}>
                            {accordion
                                .sort((a, b) => {
                                    if (a.label.length < b.label.length)
                                        return -1;
                                    if (a.label.length > b.label.length)
                                        return 1;
                                    else return 0;
                                })
                                .map((item, i) => {
                                    const {
                                        label,
                                        component: Component,
                                        isActive,
                                    } = item;
                                    return (
                                        <li
                                            key={i}
                                            ref={isActive ? refParent : null}
                                            className={styles.list}
                                            data-active={isActive}
                                        >
                                            <AccordionButton
                                                label={label}
                                                active={isActive}
                                                onClick={() => {
                                                    setAccordion((prev) => {
                                                        const prevActive =
                                                            prev.find(
                                                                (item) =>
                                                                    item.isActive
                                                            );
                                                        if (!prevActive)
                                                            return prev;
                                                        prevActive.isActive =
                                                            false;
                                                        prev[i].isActive = true;
                                                        return [...prev];
                                                    });
                                                }}
                                            />

                                            <AccordionLayout
                                                isActive={isActive}
                                                label={label}
                                            >
                                                <Component />
                                            </AccordionLayout>
                                        </li>
                                    );
                                })}
                        </ul>
                    </main>
                    <Footer />
                </>
            )}
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
