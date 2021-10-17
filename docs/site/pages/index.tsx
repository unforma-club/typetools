import styles from "components/accordion.module.scss";
import { ComponentType } from "react";
import { AccordionLayout } from "components/AccordionLayout";
import NextHead from "next/head";
import NextDynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
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

export default function Page() {
    const meta = {
        title: "Typetools by Unforma™Club",
        description: "Typetools by Unforma™Club",
    };
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

    useEffect(() => {
        /**
         * Set css variable `--accordion-height`
         * For base height of each accordion contents
         */
        const html = document.documentElement;
        html.style.setProperty(
            "--accordion-height",
            `calc(100vh - calc(var(--header-height) * ${accordion.length + 2}))`
        );
    }, [accordion.length]);

    return (
        <>
            <NextHead>
                <title>{meta.title}</title>
                <meta name="title" content={meta.title} />
                <meta name="description" content={meta.description} />
            </NextHead>

            <Header />

            <main>
                <ul className={styles.container}>
                    {accordion
                        .sort((a, b) => {
                            if (a.label.length < b.label.length) return -1;
                            if (a.label.length > b.label.length) return 1;
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
                                                const prevActive = prev.find(
                                                    (item) => item.isActive
                                                );
                                                if (!prevActive) return prev;
                                                prevActive.isActive = false;
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
    );
}
