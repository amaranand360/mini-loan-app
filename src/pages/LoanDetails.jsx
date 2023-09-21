// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Navigate, useParams } from 'react-router-dom';
// import { server } from '../index';

// function LoanDetails() {
//   const { loanId } = useParams();
//   const [loan, setLoan] = useState({});

//   useEffect(() => {
//     axios.get(`${server}/api/loans/${loanId}`)
//       .then((response) => {
//         setLoan(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching loan details:', error);
//       });
//   }, [loanId]);

//   const doRepayment = () => {
//     Navigate(`/repayment/${loanId}`)
//   };

//   return (
//     <div className="loan-details-page">
//       <h2>Loan Details</h2>
//       <div>
//         <strong>Loan ID:</strong> {loan._id}
//       </div>
//       <div>
//         <strong>Amount:</strong> ${loan.amountRequired}
//       </div>
//       <div>
//         <strong>Term:</strong> {loan.loanTerm} weeks
//       </div>
//       <div>
//         <strong>Status:</strong> {loan.status}
//       </div>
//       <h3>Make a Repayment</h3>
//       <div>
//         <button onClick={doRepayment}>Do Repayment</button>
//       </div>
//     </div>
//   );
// }

// export default LoanDetails;
import React, { useEffect, useState } from 'react';
import './LoanDetails.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { server } from '../index';

function LoanDetails() {
  const { loanId } = useParams();
  const [loan, setLoan] = useState({});
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/api/loans/${loanId}`)
      .then((response) => {
        setLoan(response.data);
      })
      .catch((error) => {
        console.error('Error fetching loan details:', error);
      });

    axios
      .get(`${server}/api/payments/${loanId}`)
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment details:', error);
      });
  }, [loanId]);



  return (
    <div className="loan-details-page">
      <div className="loan-card">
        <h2>Loan Details</h2>
        <div>
          <strong>Loan ID:</strong> {loan._id}
        </div>
        <div>
          <strong>Amount:</strong> ${loan.amountRequired}
        </div>
        <div>
          <strong>Term:</strong> {loan.loanTerm} weeks
        </div>
        <div>
          <strong>Status:</strong> {loan.status}
        </div>
        <h3>Make a Repayment</h3>
       
      </div>

      <div className="payment-card">
        <h3>Payment Details</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                <td>{payment.date}</td>
                <td>${payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LoanDetails;
