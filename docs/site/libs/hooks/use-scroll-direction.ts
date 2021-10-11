import { useState, useEffect } from "react";

type Init = "no" | "up" | "down" | null;
type Treshold = number | null;
type Off = boolean | null;

export default function useScrollDirection(
    init: Init = "no",
    treshold: Treshold = 0,
    off: Off = false
) {
    const [scrollDir, setScrollDir] = useState(init);
    const [scrollCount, setScrollCount] = useState(0);
    const [isLifting, setIsLifting] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    useEffect(() => {
        const newTreshold = treshold || 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;
        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;
            setScrollCount(scrollY);
            if (Math.abs(scrollY - lastScrollY) < newTreshold) {
                ticking = false;
                return;
            }
            setScrollDir(scrollY > lastScrollY ? "down" : "up");
            setIsLifting(scrollY >= newTreshold);
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };
        /**
         * Bind the scroll handler if `off` is set to false.
         * If `off` is set to true reset the scroll direction.
         */
        !off ? window.addEventListener("scroll", onScroll) : setScrollDir(init);
        return () => window.removeEventListener("scroll", onScroll);
    }, [init, treshold, off]);
    return { direction: scrollDir, scrollToTop, scrollCount, isLifting };
}
