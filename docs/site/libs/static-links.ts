interface StaticLink {
    href: string;
    label: string;
}

export const STATIC_LINKS: Array<StaticLink> = [
    { label: "Overview", href: "/" },
    { label: "Typetester", href: "/typetester" },
    { label: "Glyphs", href: "/glyphs" },
    { label: "Metrics", href: "/metrics" },
];
