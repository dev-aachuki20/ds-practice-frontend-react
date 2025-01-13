import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from '../../validations/validation';

function RegisterForm({ onRegister }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(registerSchema)
    })

    const onSubmitHandler = async (data) => {
        try {
            console.log({ data });
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/signup`
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password,
                    mobile_number: data.mobile_number,
                }),
            })

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Sorry not registered');
            }
            toast.success(responseData.message);
            onRegister(responseData);
            reset();
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
                                <form className="pt-3" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleInputUsername1"
                                            placeholder="First Name"
                                            {...register("first_name")}
                                        />
                                        {errors.first_name && <p className="error">{errors.first_name.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            id="exampleInputUsername1"
                                            placeholder="Last Name"
                                            {...register("last_name")}
                                        />
                                        {errors.last_name && <p className="error">{errors.last_name.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="Email"
                                            {...register("email")}
                                        />
                                        {errors.email && <p className="error">{errors.email.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            {...register("password")}
                                        />
                                        {errors.password && <p className="error">{errors.password.message}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="Mobile Number"
                                            {...register("mobile_number")}
                                        />
                                        {errors.mobile_number && <p className="error">{errors.mobile_number.message}</p>}

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