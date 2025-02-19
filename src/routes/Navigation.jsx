import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/layouts/Navbar';
import Main from '../components/layouts/Main';
import LoginForm from '../pages/Auth/Login';
import RegisterForm from '../pages/Auth/Register';
import Profile from '../pages/Profile/Profile';
import ChangePassword from '../pages/Profile/ChangePassword';
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import { toast } from "react-toastify";
import UserList from "../pages/User/UserList";
import PostList from "../pages/Post/PostList";
import PostCreate from "../pages/Post/PostCreate";
import PostEdit from "../pages/Post/PostEdit";

function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);
    const [token, setToken] = useState(null);
    // const navigate = useNavigate();

    // Automatically check for a stored token on initial render
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (data, token) => {
        setIsLoggedIn(true);
        setToken(token);
        setLoggedInUserDetails(data.data);
        localStorage.setItem('authToken', data.token);
    }

    const handleLogout = () => {
        setToken(null);
        setIsLoggedIn(false);
        setLoggedInUserDetails(null);
        localStorage.removeItem('authToken');
        toast.success("Logout Successfully");

    }

    const handleRegistration = (data, token) => {
        setIsLoggedIn(true);
        setToken(token);
        setLoggedInUserDetails(data.data);
        localStorage.setItem('authToken', data.token);
    }

    return (
        <Router>
            <div className="App">
                {isLoggedIn ? (
                    <>
                        <Navbar onLogout={handleLogout} />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="*" element={<Navigate to="/" />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/change-password" element={<ChangePassword user={loggedInUserDetails} />} />
                            <Route path="/users" element={<UserList />} />
                            <Route path="/posts" element={<PostList />} />
                            <Route path="/posts/create" element={<PostCreate />} />
                            <Route path="/posts/edit/:postId" element={<PostEdit />} />

                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
                        <Route path="/register" element={<RegisterForm onRegister={handleRegistration} />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default Navigation;
