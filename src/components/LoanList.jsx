import React from 'react';
import { Link } from 'react-router-dom';

function LoanList({ loans }) {
  return (
    <div className="loan-list">
      <h2>Your Loans</h2>
      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Amount</th>
            <th>Loan Term (in weeks)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan._id}>
              <td>{loan._id}</td>
              <td>${loan.amountRequired}</td>
              <td>{loan.loanTerm} weeks</td>
              <td>
                <Link to={`/loan-details/${loan._id}`}>
                  <button>Details</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LoanList;
