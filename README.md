# Figma Design Tokens Plugin

## Overview
The Figma Design Tokens Plugin is a tool designed to streamline the process of creating and managing design tokens within Figma. This plugin allows designers to define typographic styles, color schemes, and design principles based on various design methodologies. Once configured, the tokens can be easily exported for use by developers.

## Features
- **Typographic Settings**: Input fields for selecting typographic fonts.
- **Design Type Selection**: Options to choose from various design types such as Material, Minimalist, Neumorphic, Skeuomorphic, and Ant Design.
- **Color Theory Patterns**: Ability to select basic colors using common color theory patterns like triadic and complementary.
- **Token Generation**: Automatically generates design tokens based on user inputs.
- **Export Functionality**: Download the generated tokens for handoff to developers.

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- Figma account to use the plugin.

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/figma-design-tokens-plugin.git
   ```
2. Navigate to the project directory:
   ```
   cd figma-design-tokens-plugin
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Plugin
1. Open Figma and go to the Plugins menu.
2. Select "Development" and then "New Plugin..."
3. Choose "Link existing plugin" and select the `manifest.json` file from the project directory.
4. Run the plugin from the Plugins menu.

## Usage
1. Open the plugin in Figma.
2. Fill in the required fields for typographic font, design type, and color selections.
3. Click the "Generate Tokens" button to create the design tokens.
4. Use the "Download Tokens" button to export the tokens for developers.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Sample

```
// --- ui.html ---
<h2>Rectangle Creator</h2>
<p>Count: <input id="count" type="number" value="5"></p>
<button id="create">Create</button>
<button id="cancel">Cancel</button>

<script>

document.getElementById('create').onclick = () => {
  const textbox = document.getElementById('count');
  const count = parseInt(textbox.value, 10);
  parent.postMessage({ pluginMessage: { type: 'create-shapes', count } }, '*')
}

document.getElementById('cancel').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
}

</script>

// ----- code.ts -----
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage =  (msg: {type: string, count: number}) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-shapes') {
    // This plugin creates rectangles on the screen.
    const numberOfRectangles = msg.count;

    const nodes: SceneNode[] = [];
    for (let i = 0; i < numberOfRectangles; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

```