# Experiment 5: MongoDB, Mongoose & MVC Dashboard

A professional Backend Hub for student and product management, demonstrating the power of Mongoose ODM, MVC architecture, and MongoDB Aggregation.

## Experiment Aims

### 1. Product CRUD (Sub-Experiment 5.1)
- **Goal**: Perform CRUD operations for a product database using Mongoose.
- **Implementation**: Defined Mongoose schemas for products and implemented Create, Read, and Delete operations with validation.

### 2. Student Management (Sub-Experiment 5.2)
- **Goal**: Build a student management system using MVC architecture.
- **Implementation**: Created a strict MVC directory structure (`models`, `controllers`, `routes`, `views`). Used RESTful routing and EJS templates for server-side rendering.

### 3. Advanced Catalog (Sub-Experiment 5.3)
- **Goal**: Create nested schemas for a product catalog and implement aggregation and stock management.
- **Implementation**: Integrated **Nested Schemas** for Variants and Reviews. Leveraged **MongoDB Aggregation Pipelines** to calculate real-time inventory stats and quality metrics.

## Technical Stack
- **Architecture**: Model-View-Controller (MVC)
- **Frontend**: EJS (Embedded JavaScript) + Vanilla CSS (Glassmorphism)
- **Backend**: Express.js, Mongoose
- **Database**: MongoDB Atlas (Cloud)

## Theme Consistency
Aligned with the **Experiment 4: Backend Hub** design language:
- **Primary Color**: Indigo (#6366f1)
- **Secondary Color**: Pink (#ec4899)
- **Glassmorphism**: Backdrop blur (20px), linear gradients, and animated blobs.

## How to Run
1. Ensure `.env` is configured with `MONGO_URI`.
2. Run `npm install`.
3. Run `node server.js`.
4. Visit [http://localhost:3000](http://localhost:3000).
