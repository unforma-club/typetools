import type { FC } from "react";
import NextHead from "next/head";
import { Header } from "./Header";

interface MainLayoutProps {
    title?: string;
    description?: string;
}

export const MainLayout: FC<MainLayoutProps> = (props) => {
    const {
        children,
        title = "Typetools by Unforma™Club",
        description = "Typetools by Unforma™Club",
    } = props;
    return (
        <>
            <NextHead>
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
            </NextHead>
            <main>
                <Header />
                <div>{children}</div>
            </main>
        </>
    );
};
