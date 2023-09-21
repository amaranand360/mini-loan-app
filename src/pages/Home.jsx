import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import LoanApplication from '../components/LoanApplication';
import LoanList from '../components/LoanList';
import { Context } from '../index';
import { server } from '../index';
import { Navigate } from 'react-router-dom';
function Home({ userId }) {
  const { isAuthenticated,  loading, setLoading } = useContext(Context)


  const [userLoans, setUserLoans] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    axios.get(`${server}/api/loans/${userId}`)
      .then((response) => {
        setLoading(true)
        setUserLoans(response.data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching user loans:', error);
      });
  }, [userId, isAuthenticated,loading]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-page">
      <h2>Welcome, User</h2>
      <LoanApplication userId={userId} />
      <LoanList loans={userLoans} />
    </div>
  );
}

export default Home;

