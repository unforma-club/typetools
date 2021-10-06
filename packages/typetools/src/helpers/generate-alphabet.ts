export const generateAlphabet = () => {
    const uppercase = Array.from(Array(26)).map((_, i) => i + 65);
    const lowercase = Array.from(Array(26)).map((_, i) => i + 97);
    const stringUppercase = uppercase.map((x) => String.fromCharCode(x));
    const stringLowercase = lowercase.map((x) => String.fromCharCode(x));

    const alphabet = stringUppercase.map((s, si) => {
        const target = stringLowercase.find((_t, ti) => ti === si);
        return target ? `${s}${target}` : s;
    });

    return alphabet.join(" ");
};
