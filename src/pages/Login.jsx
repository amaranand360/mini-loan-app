import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./register.css";
import { Context, server } from "../index";

const Login= ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${server}/users/check-admin`, {
          withCredentials: true,
        })
        .then((response) => {
          setIsAdmin(response.data.isAdmin);
        })
        .catch((error) => {
          console.error("Error checking admin status:", error);
        });
    }
  }, [isAuthenticated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setEmail("");
      setPassword("");
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated && isAdmin) {
    return <Navigate to={"/admin"} />;
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="username@gmail.com"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <h6>Are You New?</h6>
          <button className="login-btn">
            {" "}
            <Link to="/register">Sign up</Link>{" "}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
