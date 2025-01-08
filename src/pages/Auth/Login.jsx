import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginForm({ onLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/login`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Invalid login credentials');
            }

            toast.success(responseData.message);
            onLogin(responseData);
        } catch (error) {
            toast.error(error.message || 'Something went wrong.');
        }
    };
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row flex-grow">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <div className="brand-logo">
                                    <img src="../../assets/images/logo.svg" />
                                </div>
                                <h4>Hello! let&apos;s get started</h4>
                                <h6 className="font-weight-light">Sign in to continue.</h6>
                                <form className="pt-3" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="Username"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}

                                        />
                                    </div>
                                    <div className="mt-3 d-grid gap-2">
                                        <button type='submit' className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
                                            SIGN IN
                                        </button>
                                        {/* <a
                                            className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            href="../../index.html"
                                        >
                                            SIGN IN
                                        </a> */}
                                    </div>
                                    <div className="my-2 d-flex justify-content-between align-items-center">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" /> Keep me signed in <i className="input-helper" />
                                            </label>
                                        </div>
                                        <Link to="/forgot-password" className="auth-link text-primary">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    {/* <div className="mb-2 d-grid gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-facebook auth-form-btn"
                                        >
                                            <i className="mdi mdi-facebook me-2" />
                                            Connect using facebook
                                        </button>
                                    </div> */}
                                    <div className="text-center mt-4 font-weight-light">
                                        Don&apos;t have an account?
                                        <Link to="/register" className="text-primary">
                                            Create
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;