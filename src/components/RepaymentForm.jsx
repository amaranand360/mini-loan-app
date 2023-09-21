import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Repayment.css'

function RepaymentForm({ onRepaymentSubmit }) {
  const { loanId } = useParams();
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTerm, setLoanTerm] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState('');

  useEffect(() => {
    axios.get(`/api/loans/${loanId}`)
      .then((response) => {
        const { amountRequired, loanTerm } = response.data;
        setLoanAmount(10000);
        setLoanTerm(3);
      })
      .catch((error) => {
        console.error('Error fetching loan details:', error);
      });
  }, [loanId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loanAmountFloat = parseFloat(loanAmount);
    const weeklyRepayment = loanAmountFloat / loanTerm;

    const scheduledRepayments = [];

    for (let i = 1; i <= loanTerm; i++) {
      const repaymentDate = new Date();
      repaymentDate.setDate(repaymentDate.getDate() + i * 7);

      const formattedDate = repaymentDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const scheduledRepayment = {
        date: formattedDate,
        amount: (i === loanTerm) ? (loanAmountFloat - (weeklyRepayment * (loanTerm - 1))).toFixed(2) : weeklyRepayment.toFixed(2),
        status: 'PENDING',
      };

      scheduledRepayments.push(scheduledRepayment);
    }

    onRepaymentSubmit(scheduledRepayments);
  };

  return (
    <div className="repayment-form">
      <h2>Add Repayment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Loan Amount:</label>
          <span>${loanAmount}</span>
        </div>
        <div>
          <label>Loan Term (in weeks):</label>
          <span>{loanTerm} weeks</span>
        </div>
        <div>
          <label>Repayment Amount:</label>
          <input
            type="number"
            value={repaymentAmount}
            onChange={(e) => setRepaymentAmount(e.target.value)}
            readOnly
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RepaymentForm;
