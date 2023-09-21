import React, { useState } from 'react';
import axios from 'axios';

function LoanApplication() {
  const [loanAmount, setLoanAmount] = useState('');
  const [loanTerm, setLoanTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        amountRequired: loanAmount,
        loanTerm,
        repaymentFrequency: 'weekly',
      });
      console.log('Loan application submitted:', response.data);
    } catch (error) {
      console.error('Error submitting loan application:', error);
    }
  };

  return (
    <div>
      <h1>Loan Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loanAmount">Amount Required:</label>
          <input
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="loanTerm">Loan Term (in weeks):</label>
          <input
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoanApplication;
