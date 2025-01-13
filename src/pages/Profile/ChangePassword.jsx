import React, { useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../../validations/validation";

function ChangePassword({ user }) {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: ''
        }
    })

    const onSubmitHandler = async (data) => {
        setLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.success('Token not found. Please login again.')
            setLoading(false);
            return;
        }

        const { oldPassword, newPassword } = data;
        const updatedData = { oldPassword, newPassword };

        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/profile/change-password`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            })

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Sorry');
            }

            toast.success(responseData.message)
            reset();

        } catch (error) {
            toast.error(error.message);
            return;
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                    <i className="mdi mdi-account"></i>
                                </span> Change Password
                            </h3>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-class">
                                            <form onSubmit={handleSubmit(onSubmitHandler)} >
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        Old password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="password" className="form-control" id="inputEmail3" {...register("oldPassword")} />
                                                        {errors.oldPassword && <p className="error">{errors.oldPassword.message}</p>}
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        New password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="password" className="form-control" id="inputEmail3" {...register("newPassword")} />
                                                        {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                                    {loading ? 'Updating...' : 'Update'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default ChangePassword;