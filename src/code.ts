// const { widget } = figma;
// const { AutoLayout, Text, Input, Button } = widget;

// let designTokens = {
//     font: '',
//     designType: '',
//     colors: []
// };

// function createDesignTokens(font, designType, colors) {
//     designTokens.font = font;
//     designTokens.designType = designType;
//     designTokens.colors = colors;

//     // Here you would typically process the design tokens further
//     // and apply them to the Figma document or prepare them for download.
// }

// widget.register(() => {
//     return (
//         <AutoLayout direction="vertical" padding={20}>
//             <Text fontSize={24} fontWeight="bold">Design Tokens Setup</Text>
//             <Input
//                 placeholder="Enter typographic font"
//                 onTextEdit={(text) => designTokens.font = text}
//             />
//             <Input
//                 placeholder="Enter design type (e.g., Material, Minimalist)"
//                 onTextEdit={(text) => designTokens.designType = text}
//             />
//             <Input
//                 placeholder="Enter colors (comma separated)"
//                 onTextEdit={(text) => designTokens.colors = text.split(',')}
//             />
//             <Button
//                 onClick={() => createDesignTokens(designTokens.font, designTokens.designType, designTokens.colors)}
//             >
//                 Generate Tokens
//             </Button>
//         </AutoLayout>
//     );
// });

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = (msg) => {
    figma.notify('Design tokens generated! -> ' + msg.type);
    figma.closePlugin();
    return;
  if (msg.type === 'generate-tokens') {
    const { font, designType, colors } = msg;
    // Process and store your design tokens here
    // For example, create variables or styles in Figma
    figma.notify('Design tokens generated!');
    figma.closePlugin();
  }
};