import { TypefaceMetrics } from "@unforma-club/typetools";

interface useSVGMetricsProps extends TypefaceMetrics {
    width: number;
    height: number;
    advanceWidth: number;
}
export const useSVGMetrics = (props: useSVGMetricsProps) => {
    const { width, height, advanceWidth, yMax, yMin, xMax, xMin, unitsPerEm } =
        props;

    // const pixelRatio = window.devicePixelRatio;
    const pixelRatio = 1;
    const parentWidth = width / pixelRatio;
    const parentHeight = height / pixelRatio / 1.1;
    const maxHeight = yMax - yMin;
    const maxWidth = xMax - xMin;
    const glyphScale = Math.min(
        parentWidth / maxWidth,
        parentHeight / maxHeight
    );
    const glyphSize = glyphScale * unitsPerEm;
    const glyphBaseline = (parentHeight * yMax) / maxHeight;
    const glyphWidth = advanceWidth * glyphScale;
    const xmin = (parentWidth - glyphWidth) / 2; // Glyph position, divide by two mean horizontally centered from parent

    return {
        parentHeight,
        parentWidth,
        maxHeight,
        glyphSize,
        glyphBaseline,
        xmin,
        glyphScale,
    };
};
