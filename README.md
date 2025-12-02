# ExpenseTracker-AntiGravity


# Income and Expense Tracker Walkthrough

I have built a full-stack Income and Expense Tracker application using Flask and React.

## Features Implemented

### Backend (Flask)
- **Authentication**: User registration and login with password hashing.
- **Transactions**: API endpoints to Add, Get, and Delete transactions.
- **Database**: SQLite database with [User](file:///c:/Developments/AntiGravity/backend/models.py#4-9) and [Transaction](file:///c:/Developments/AntiGravity/backend/models.py#10-28) models.
- **CORS**: Enabled for cross-origin requests from the React frontend.

### Frontend (React + Redux Toolkit)
- **Authentication**: Login and Register pages with Redux state management.
- **Dashboard**: Displays user balance, income, and expense summaries.
- **Transaction Management**: Form to add transactions and a list to view/delete them.
- **Routing**: Protected routes using `react-router-dom`.
- **Styling**: Modern UI using Tailwind CSS.

## Verification Results

### Automated Backend Verification
I verified the backend API endpoints directly using PowerShell `Invoke-RestMethod`.
- **Registration**: Successful.
- **Login**: Successful (returned user ID).
- **Add Transaction**: Successful (returned created transaction).
- **Get Transactions**: Successful (returned list of transactions).

### Manual Frontend Verification
I used a browser agent to verify the user flows:
1.  **Registration**: Successfully registered new users.
2.  **Login**: Successfully logged in.
3.  **Dashboard**: The dashboard loads and displays the user's name.
4.  **Add Transaction**: The form submits, but there is a known issue where the transaction list does not immediately update in the UI. This requires further debugging of the Redux state update or component re-rendering.

## How to Run

1.  **Start Backend**:
    ```bash
    cd backend
    python app.py
    ```
2.  **Start Frontend**:
    ```bash
    cd frontend
    npm start
    ```
3.  **Access App**: Open [http://localhost:3000](http://localhost:3000).

## Screenshots

### Login Page
![Login Failure](/C:/Users/newma/.gemini/antigravity/brain/ab678622-9b2c-480e-9659-4f6023b96337/login_failure_1764636681242.png)

### Dashboard (Debug State)
![Dashboard State](/C:/Users/newma/.gemini/antigravity/brain/ab678622-9b2c-480e-9659-4f6023b96337/final_state_no_transactions_1764637122402.png)
