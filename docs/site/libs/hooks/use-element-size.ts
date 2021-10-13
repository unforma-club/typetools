import { useEffect, useRef, useState } from "react";
import Resize from "resize-observer-polyfill";

export function useElementSize(dependencies: Array<any> = []) {
    const IS_BROWSER = typeof window !== "undefined";
    const ref = useRef<HTMLElement>(null);

    const [bounds, set] = useState<{
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
        x: number;
        y: number;
    }>({
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    });

    const [ro] = useState(
        () => IS_BROWSER && new Resize(([entry]: any) => set(entry.contentRect))
    );

    useEffect(() => {
        if (!ro) return;
        if (!ref.current) return;
        // @ts-ignore
        ro.observe(ref.current);

        return () => ro.disconnect();
    }, [...dependencies]);

    return { ref, bounds };
}
