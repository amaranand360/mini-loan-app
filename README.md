# Mini Loan Web App

Welcome to the Mini Loan Web App! This web application allows authenticated users to apply for loans, view their loans, and make repayments. It is built using React for the front end and Node.js with MongoDB for the backend.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)


## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Axios for API requests
  - Other libraries or dependencies you may have used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for data storage
  - Mongoose for MongoDB interaction
  - Other libraries or dependencies you may have used

## Features

### User Functions

1. **Loan Application:**
   - Authenticated users can apply for a loan by specifying the loan amount and term.
   - The application generates scheduled repayments based on the loan details.

2. **Loan Approval:**
   - Admin users can approve loan applications, changing the status from PENDING to APPROVED.

3. **Loan Viewing:**
   - Authenticated users can view their own loans.
   - Policies ensure users can only view their own loans.

4. **Repayments:**
   - Users can submit weekly loan repayments.

5. **Loan Status Update:**
   - When all scheduled repayments are paid, the loan status changes to PAID.

### Admin Functions

1. **Loan Approval:**
   - Admins can approve pending loan applications.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/amaranand360/mini-loan-app.git

## Loans API
Create a Loan:

### Endpoint: /api/loans
 - Method: POST
 - Request body: JSON containing loan amount and term
 - Response: Loan ID and scheduled repayments
 - Approve a Loan:

### Endpoint: /api/loans/:id
 - Method: PUT
 - Request body: JSON containing status (APPROVED)
 - Response: Updated loan object

   Get User Loans:

### Endpoint: /api/loans/:userId
 - Method: GET
 - Response: List of user's loans
 - Repayments API
 - Add Repayment:

### Endpoint: /api/repayments
 - Method: POST
 - Request body: JSON containing repayment details
 - Response: Repayment object
