import styles from "components/accordion.module.scss";
import type { ComponentType } from "react";
import type { BaseAccordion } from "components/AccordionLayout";
import NextHead from "next/head";
import { useEffect, useRef, useState } from "react";
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { AccordionMetrics } from "components/AccordionMetrics";
import { AccordionTypetester } from "components/AccordionTypetester";
import { AccordionGlyphs } from "components/AccordionGlyphs";
import { AccordionButton } from "components/AccordionButton";

interface Accordion {
    label: "Typetester" | "Glyphs" | "Metrics";
    isActive: boolean;
    component: ComponentType<BaseAccordion>;
}

export default function Page() {
    const meta = {
        title: "Typetools by Unforma™Club",
        description: "Typetools by Unforma™Club",
    };
    const [accordion, setAccordion] = useState<Array<Accordion>>([
        {
            label: "Typetester",
            isActive: true,
            component: (props: BaseAccordion) => (
                <AccordionTypetester {...props} />
            ),
        },
        {
            label: "Glyphs",
            isActive: false,
            component: (props: BaseAccordion) => <AccordionGlyphs {...props} />,
        },
        {
            label: "Metrics",
            isActive: false,
            component: (props: BaseAccordion) => (
                <AccordionMetrics {...props} />
            ),
        },
    ]);

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
    }, [accordion]);

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
                            if (a.label < b.label) return -1;
                            if (a.label > b.label) return 1;
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

                                    <Component
                                        isActive={isActive}
                                        label={label}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </main>
            <Footer />
        </>
    );
}
