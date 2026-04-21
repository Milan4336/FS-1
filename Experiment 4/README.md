# Experiment 4: Backend Hub & Redis Concurrency

A backend-focused laboratory project demonstrating Command-Line Interfaces, RESTful APIs, and Concurrent System Design using Redis.

## Technical Approach

### 1. Employee CLI Tool (Sub-Experiment 4.1)
- **Concept**: A standalone Node.js script for administrative tasks.
- **Implementation**: Uses `inquirer` to provide a user-friendly terminal menu and `chalk` for status-based coloring (Green for Success, Red for Delete). 
- **Storage**: Implements an array-based data structure to store employee profiles, demonstrating basic data manipulation without a persistent database.

### 2. Playing Card REST API (Sub-Experiment 4.2)
- **Concept**: Modern web service design using **Express.js**.
- **Implementation**: 
    - Provides standard CRUD (Create, Read, Delete) endpoints for a playing card collection.
    - Uses UUIDs for unique ID generation, ensuring no ID collisions during high-frequency additions.
    - Served via a RESTful architecture, allowing any frontend client to interact with the collection.

### 3. Concurrent Ticket Booking (Sub-Experiment 4.3)
- **Concept**: Preventing **Race Conditions** in distributed systems.
- **The Redis Method**: 
    - Employs the **Atomic Lock** pattern using Redis `SET` with the `NX` (Not Exists) and `EX` (Expire) flags.
    - **How it works**: When a user clicks a seat, the server attempts to create a "Lock Key" in Redis. If the key already exists (meaning another request arrived first), Redis rejects the second request instantly.
    - **Safety**: Locks are set to expire after 60 seconds. This prevents "Stale Locks" where a seat remains locked forever if a user's browser crashes mid-purchase.

## Design Philosophy
- **Theme Consistency**: The dashboard retains the **Glassmorphism** aesthetic (moving blobs, blurs, vibrant indigo/pink palette) used throughout the Lab series.
- **Interactive Simulation**: Includes a "Race Condition Simulator" to prove the effectiveness of the Redis locking mechanism by firing simultaneous requests.

## How to Run
1. Navigate to the `Experiment 4` folder.
2. Ensure your Redis credentials are in the `.env` file.
3. Run `npm install`.
4. To start the Web Dashboard: `node server.js`.
5. To start the CLI Tool: `node employee-cli.js`.
