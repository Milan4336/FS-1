# Experiment 2: Interactive Web Components

A premium, single-page interactive dashboard demonstrating three distinct web functionalities: a live character counter, a dynamic product filter, and an interactive SVG drawing tool.

## Technical Approach

### 1. Unified Interface Logic
The project uses a **Tabbed Navigation System** implemented in pure JavaScript. This approach keeps the page lightweight while providing a focused environment for each sub-experiment. Transitions are handled via CSS animations to ensure a smooth, "app-like" experience.

### 2. Live Character Counter (Sub-Experiment 2.1)
- **Mechanism**: Utilizes the `input` event listener on a `textarea`.
- **Logic**: Calculates string length and word count using regex (`/\s+/`) for accuracy.
- **Visuals**: A dynamic progress bar that scales its `width` property in real-time, providing immediate visual feedback on input limits.

### 3. Dynamic Product Filter (Sub-Experiment 2.2)
- **Mechanism**: Employs an array-of-objects data structure for mock products.
- **Logic**: Filtering is handled by the `Array.prototype.filter()` method, triggered by a `change` event on the category dropdown.
- **Rendering**: The DOM is dynamically cleared and re-populated using template literals, maintaining a fast and responsive UI.

### 4. Interactive SVG Drawing Tool (Sub-Experiment 2.3)
- **Mechanism**: Uses the **Scalable Vector Graphics (SVG)** element combined with mouse event handlers (`mousedown`, `mousemove`, `mouseup`).
- **Coordinate Mapping**: Implements `getScreenCTM()` to accurately map mouse pixels to SVG user-space coordinates, ensuring precision across different screen sizes.
- **Persistence**: Draws `<path>` elements dynamically, allowing for smooth vector sketching.

## Design Philosophy
- **Aesthetics**: Follows a **Glassmorphism** design language using `backdrop-filter: blur()`, semi-transparent backgrounds, and high-contrast typography (Outfit & Plus Jakarta Sans).
- **Responsiveness**: built with CSS Flexbox and Grid to ensure full functionality across mobile and desktop viewports.

## How to Run
Simply open the `index.html` file in any modern web browser.
