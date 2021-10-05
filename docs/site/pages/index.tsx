import { TestComponent } from "components/test";
import { UnformaClub } from "@unforma-club/hooks";
import { useFonts } from "libs/context/ContextFonts";

export default function Page() {
    const { fonts } = useFonts();
    return (
        <main>
            Page Index {UnformaClub}
            <TestComponent />
            {fonts.length !== 0 && (
                <ul>
                    {fonts.map((item, i) => (
                        <li
                            key={i}
                            style={{ fontFamily: item.typefaceFullName }}
                        >
                            <div>{item.typefaceFamily}</div>
                            <div>{item.typefaceFullName}</div>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
