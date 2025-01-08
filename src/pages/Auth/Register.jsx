import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterForm({ onRegister }) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            mobile_number: mobileNumber,
        }

        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/signup`
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Sorry not registered');
            }
            toast.success(responseData.message);
            onRegister(responseData);
        } catch (error) {
            toast.error(error.message);

        }
    }
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
                                <h4>New here?</h4>
                                <h6 className="font-weight-light">
                                    Signing up is easy. It only takes a few steps
                                </h6>
                                <form className="pt-3" onSubmit={handleRegisterSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleInputUsername1"
                                            placeholder="First Name"
                                            name="first_name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleInputUsername1"
                                            placeholder="Last Name"
                                            name="last_name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}

                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="Email"
                                            name="email"
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
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="Mobile Number"
                                            name="mobile_number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-check">
                                            <label className="form-check-label text-muted">
                                                <input type="checkbox" className="form-check-input" /> I
                                                agree to all Terms &amp; Conditions{" "}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-3 d-grid gap-2">
                                        <button type='submit' className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">
                                            SIGN UP
                                        </button>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Already have an account?
                                        <Link to="/" className="text-primary">
                                            Login
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;