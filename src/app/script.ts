console.log("Design Tokens Off Script Plugin Loaded");
const submitButton = document.getElementById('generate-tokens');
const downloadButton = document.getElementById('download-tokens');

submitButton?.addEventListener('click', () => {
    parent.postMessage({ pluginMessage: { type: 'generate-tokens', tokens: {tokens: ""} } }, '*');

    return false;
    const font = (document.getElementById('font-input') as HTMLInputElement).value;
    const designType = (document.getElementById('design-type-select') as HTMLSelectElement).value;
    const primaryColor = (document.getElementById('primary-color-input') as HTMLInputElement).value;
    const secondaryColor = (document.getElementById('secondary-color-input') as HTMLInputElement).value;

    if (validateInputs(font, designType, primaryColor, secondaryColor)) {
        const tokens = createDesignTokens(font, designType, primaryColor, secondaryColor);
        parent.postMessage({ pluginMessage: { type: 'generate-tokens', tokens } }, '*');
    } else {
        alert('Please fill in all fields correctly.');
    }
});

downloadButton?.addEventListener('click', () => {
    parent.postMessage({ pluginMessage: { type: 'download-tokens' } }, '*');
});

function validateInputs(font: string, designType: string, primaryColor: string, secondaryColor: string): boolean {
    return font !== '' && designType !== '' && isValidColor(primaryColor) && isValidColor(secondaryColor);
}

function isValidColor(color: string): boolean {
    const hexColorPattern = /^#([0-9A-F]{3}){1,2}$/i;
    return hexColorPattern.test(color);
}

function createDesignTokens(font: string, designType: string, primaryColor: string, secondaryColor: string) {
    return {
        font,
        designType,
        colors: {
            primary: primaryColor,
            secondary: secondaryColor,
        },
    };
}