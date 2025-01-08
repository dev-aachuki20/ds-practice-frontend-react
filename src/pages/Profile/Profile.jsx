import React, { useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import { toast } from "react-toastify";
function Profile({ user }) {

    const [firstName, setFirstName] = useState(user?.first_name || '');
    const [lastName, setLastName] = useState(user?.last_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [mobileNumber, setMobileNumber] = useState(user?.mobile_number || '');

    const apiUrl = `${process.env.REACT_APP_BASE_URL}/profile/update`;

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            return toast.success('Token not found. Please login again.')
        }

        try {
            const formData = {
                first_name: firstName,
                last_name: lastName,
                mobile_number: mobileNumber
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Unable to update profile.');
            }

            toast.success(responseData.message);


        } catch (error) {
            toast.error(error.message || 'Error updating profile.');
        }
    };

    if (!user) {
        return toast.error('No user data available. Please log in.');
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
                                </span> User Profile Detail
                            </h3>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-class">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <form onSubmit={handleUpdateProfile}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                                First name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputEmail3" value={firstName}
                                                                    onChange={(e) => setFirstName(e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                                Last name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputEmail3"
                                                                    value={lastName}
                                                                    onChange={(e) => setLastName(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                                Email
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input disabled readOnly type="email" className="form-control" id="inputEmail3"
                                                                    value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                                                Mobile No.
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="number" className="form-control" id="inputPassword3"
                                                                    value={mobileNumber}
                                                                    onChange={(e) => setMobileNumber(e.target.value)} />
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
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Profile;