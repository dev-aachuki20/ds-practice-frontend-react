import React, { useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import { toast } from "react-toastify";

function ChangePassword({ user }) {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('authToken');
        if (!token) {
            return toast.success('Token not found. Please login again.')
        }
        try {

            const apiUrl = `${process.env.REACT_APP_BASE_URL}/profile/change-password`;
            const response = await fetch(apiUrl, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ oldPassword, newPassword }),
            })

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Sorry');
            }

            toast.success(responseData.message)

        } catch (error) {
            toast.error(error.message);
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
                                            <form onSubmit={handleChangePassword} >
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        Old password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="password" className="form-control" id="inputEmail3"
                                                            value={oldPassword}
                                                            onChange={(e) => setOldPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        New password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="password" className="form-control" id="inputEmail3"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <button type="submit" className="btn btn-primary">
                                                    Update
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