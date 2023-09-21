import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../index';

function Admin() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    axios.get(`${server}/api/loans?status=PENDING`) 
      .then((response) => {
        setLoans(response.data);
      })
      .catch((error) => {
        console.error('Error fetching loans:', error);
      });
  }, []);

  const approveLoan = (loanId) => {

    axios.put(`${server}/api/loans/${loanId}`, { status: 'APPROVED' })
      .then((response) => {
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan._id === loanId ? { ...loan, status: 'APPROVED' } : loan
          )
        );
      })
      .catch((error) => {
        console.error('Error approving loan:', error);
      });
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Amount</th>
            <th>Term</th>
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
                {loan.status === 'PENDING' && (
                  <button onClick={() => approveLoan(loan._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
