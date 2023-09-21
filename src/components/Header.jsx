import React from 'react';
import './Header.css'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../index';
import axios from "axios";
import toast from "react-hot-toast";
import { AiFillHome } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { server } from '../index';

function Header() {

    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context)


    const logoutHandler = async (e) => {
        setLoading(true);
        try {
            await axios.get(`${server}/users/logout`, {

                withCredentials: true,
            });

            toast.success("Logout successfully");
            setIsAuthenticated(false);
            setLoading(false);

        }
        catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(true);
            setLoading(false);

        }
    }

    return (
        <nav className='header'>
            <div className='header-logo'>
                <h2>Loan app</h2>
            </div>
            <article>
                <button className='btn'> <Link to={"/"}><AiFillHome /> Home</Link> </button>
                <button className='btn'> <Link to={"/admin"}> <CgProfile />Admin</Link> </button>
                {
                    isAuthenticated ? (<button className='btn' disabled={loading} onClick={logoutHandler} > <RiLogoutBoxLine /> Logout</button>)
                        : (<button className='btn'> <Link to={"/login"}><FiLogIn /> Login</Link> </button>
                        )


                }

            </article>
        </nav>
        

    )
}

export default Header;