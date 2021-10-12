import { MainLayout } from "components/Layout";
import { useFonts } from "libs/context/ContextFonts";

export default function Page() {
    const { selectedFont } = useFonts();

    if (!selectedFont) {
        return (
            <MainLayout>
                <div className="not-found">Loading...</div>
            </MainLayout>
        );
    }
    return <MainLayout>Page Typetester</MainLayout>;
}
