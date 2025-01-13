import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPasswordSchema } from '../../validations/validation'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function ForgotPassword() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    })

    const onSubmitHandler = async (data) => {
        setLoading(true);
        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/forgot-password`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Sorry');
            }
            toast.success(responseData.message);
            reset();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }
    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth">
                    <div className="row flex-grow">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left p-5">
                                <h4>Forgot Password</h4>
                                <form className="pt-3" onSubmit={handleSubmit(onSubmitHandler)}>
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
                                    <div className="mt-3 d-grid gap-2">
                                        <button type='submit' className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                                            disabled={loading}>
                                            {loading ? 'Sending...' : 'Send'}
                                        </button>
                                    </div>

                                </form>

                                <div className="text-center mt-4 font-weight-light">
                                    Already have an account?
                                    <Link to="/" className="text-primary">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;