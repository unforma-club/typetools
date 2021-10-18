import { useEffect, useRef, useState } from "react";
import _debounce from "debounce";

type Active = "mobile" | "tablet" | "laptop" | "desktop";

export function useMediaQuery() {
    if (typeof window === "undefined") return { active: "desktop", media: 0 };
    const queries = {
        mobile: "(max-width: 767px)",
        tablet: "(min-width: 768px)",
        laptop: "(min-width: 992px)",
        desktop: "(min-width: 1200px)",
    };
    const debounce = 500;

    const mediaQueries = Object.values(queries).map((query) =>
        window.matchMedia(query)
    );
    const matchMediaQueries = () =>
        Object.keys(queries).reduce((obj, val, index) => {
            //@ts-ignore
            obj[val] = mediaQueries[index].matches;
            return obj;
        }, {});

    const [media, setMedia] = useState(matchMediaQueries());

    const resizeDebounce = useRef(debounce);
    useEffect(() => {
        const updateMedia = () => setMedia(matchMediaQueries());
        const resizeListener = _debounce(updateMedia, resizeDebounce.current);

        window.addEventListener("resize", resizeListener);
        return () => {
            window.removeEventListener("resize", resizeListener);
        };
    }, []);

    const active = Object.keys(media)
        .reverse()
        // @ts-ignore
        .find((size) => media[size]);
    return { active: active as Active, media };
}
