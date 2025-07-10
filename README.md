# Backend Application

This is the backend application, built with NestJS.

## Tech Stack

*   **Framework:** NestJS
*   **Language:** TypeScript
*   **Database/Auth Integration:** Supabase
*   **Payments:** Stripe
*   **Security:** Helmet, Express Rate Limit
*   **Cross-Origin Resource Sharing:** CORS
*   **Runtime:** Node.js

## How to Download

To get a copy of this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/zwjc/backend
    cd backend
    ```

## How to Run

After downloading the project, you can run it in various modes:

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Start in development mode (with watch):**
    ```bash
    npm run start:dev
    ```
    This will start the server and automatically restart on code changes.

3.  **Start in production mode:**
    ```bash
    npm run start:prod
    ```
    This command first builds the application and then starts the server.

## How to Build

To build the application for production:

1.  **Build the project:**
    ```bash
    npm run build
    ```
    This command compiles the TypeScript code into JavaScript, typically outputting to the `dist` folder.