# Experiment 1: Forms, Financial UI & Dashboard

A comprehensive exploration of core web technologies including HTML5 validation, stateful JavaScript logic, and advanced CSS Grid layouts.

## Technical Approach

### 1. Form Validation (Sub-Experiment 1.1)
- **Concept**: Leveraging the browser's native validation engine.
- **Implementation**: Uses attributes like `required`, `type="email"`, `min`, and `max`. This ensures data integrity before any JavaScript is even executed, reducing server-side errors and improving user experience.

### 2. Banking Interface (Sub-Experiment 1.2)
- **Concept**: Stateful UI management.
- **Logic**: 
    - Maintains a `balance` variable in the global scope.
    - Implements arithmetic validation (e.g., preventing withdrawals that exceed the current balance).
    - Features a dynamic transaction log that uses DOM manipulation (`prepend()`) to show recent activity.

### 3. Admin Dashboard & Theming (Sub-Experiment 1.3)
- **Concept**: Advanced layouts and CSS variable manipulation.
- **Grid Layout**: Uses `display: grid` with `grid-template-columns` and `grid-column: span X` to create a complex, responsive dashboard layout featuring stats, charts, and notifications.
- **Dynamic Theming**: Implements a Light/Dark mode toggle by utilizing CSS variables. Switching themes simply toggles a class on the `<body>`, which overrides the predefined color tokens in `:root`.

## Design Philosophy
- **Consistency**: Uses the same **Glassmorphism** visual language (blobs, blurs, gradients) as Experiments 2 and 3.
- **Responsiveness**: built with media queries to ensure the grid collapses gracefully on mobile devices.

## How to Run
Simply open the `index.html` file in any modern web browser.
