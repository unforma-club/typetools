import { useTheme } from "next-themes";

export const ThemeSelector = () => {
    const { themes, setTheme, theme } = useTheme();
    return (
        <>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                {themes.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </>
    );
};

export default ThemeSelector;
