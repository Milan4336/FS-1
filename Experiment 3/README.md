# Experiment 3: React Components & Object-Oriented Logic

A React-powered experimentation dashboard demonstrating component reusability, state management, and ES6 class inheritance.

## Technical Approach

### 1. Modern Framework Integration
Unlike the previous vanilla JS experiment, Experiment 3 is built using **React** (scaffolded via Vite). This allows for a declarative UI where data binding and state updates are handled efficiently by the React reconciliation engine.

### 2. Tabbed Navigation System
The dashboard uses a state-based tab system (`activeTab`) to switch between sub-experiments. This provides a clean UX while isolating the logic and styles of each component.

### 3. Reusable ProductCard (Sub-Experiment 3.1)
- **Concept**: Demonstrates the power of **Props**.
- **Implementation**: The `ProductCard` is a stateless functional component that receives `title`, `price`, `category`, and an emoji `image` from its parent. This pattern promotes the "Don't Repeat Yourself" (DRY) principle.

### 4. Library Management System (Sub-Experiment 3.2)
- **Concept**: CRUD operations and state-driven filtering.
- **Implementation**: 
    - Uses `useState` to manage the collection of books.
    - Features a real-time search filter using `Array.prototype.filter()`.
    - Implements deterministic state updates for adding and removing items.

### 5. Class Hierarchy & Inheritance (Sub-Experiment 3.3)
- **Concept**: Object-Oriented Programming (OOP) in JavaScript.
- **Hierarchy**: 
    - `Person` (Base Class): Defines common properties like `name` and `age`.
    - `Student` & `Teacher` (Derived Classes): Use `extends` to inherit from `Person` and `super()` to initialize base properties, while adding specialized attributes like `studentId` or `subject`.
- **UI Interaction**: The `HierarchyDemo` component instantiates these classes and triggers their methods (e.g., `getDetails()`) to display inherited and unique data.

## Design Philosophy
- **Consistency**: Retains the **Glassmorphism** aesthetic from Experiment 2.
- **Animations**: Uses CSS `fade-in` transitions to enhance tab switching.
- **Organization**: Follows a clean modular structure with a separate `logic` directory for pure JS classes.

## How to Run
1. Navigate to the `Experiment 3` directory.
2. Run `npm install` (if not already done).
3. Run `npm run dev` to start the local development server.
