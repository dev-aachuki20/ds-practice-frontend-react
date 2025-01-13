import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../validations/validation';

function ResetPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(resetPasswordSchema)
    })

    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();

    const onSubmitHandler = async (data) => {
        setLoading(true);

        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/reset-password`;
            const response = await fetch(apiUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword: data.password }),
            })

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Sorry');
            }

            if (response.ok) {
                toast.success(responseData.message)
                // navigate('/');
                reset();
            }


        } catch (error) {
            toast.error(error.message)
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
                                <h4>Reset Password</h4>
                                <form className="pt-3" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="exampleInputEmail1"
                                            placeholder="New Password"
                                            {...register("password")}
                                        />
                                        {errors.password && <p className="error">{errors.password.message}</p>}
                                    </div>
                                    <div className="mt-3 d-grid gap-2">
                                        <button type='submit' className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" disabled={loading}>
                                            {loading ? 'Resetting...' : 'Reset Password'}
                                        </button>
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

export default ResetPassword;