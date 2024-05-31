export function extractNumber(input: string) {
    const regex = /tensor\(([^)]+)\)/;
    const match = input.match(regex);

    if (match) {
        return parseFloat(match[1]);
    } else {
        return null; // or you can throw an error or return a default value
    }
}

