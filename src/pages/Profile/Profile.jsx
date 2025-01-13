import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileSchema } from '../../validations/validation'


function Profile() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(updateProfileSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            mobile_number: '',
            email: "",
        }
    })

    // Update form values when `user` changes
    useEffect(() => {

        const fetchUserProfile = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.success('Token not found. Please login again.');
                setLoading(false);
                return;
            }

            try {
                const apiUrl = `${process.env.REACT_APP_BASE_URL}/profile`;
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    }
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'Failed to fetch updated user data.');
                }

                setUser(responseData.data);
                reset(responseData.data);
            } catch (error) {
                toast.error(error.message || 'Error updating profile.');
                return;
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [reset]);

    const onSubmitHandler = async (data) => {
        setLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
            toast.success('Token not found. Please login again.');
            setLoading(false);
            return;
        }


        const { first_name, last_name, mobile_number } = data;
        const updatedData = { first_name, last_name, mobile_number };
        try {
            const apiUrl = `${process.env.REACT_APP_BASE_URL}/profile/update`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData)
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || 'Unable to update profile.');
            }

            toast.success(responseData.message);

            setUser(responseData.data);
            reset(responseData.data);

        } catch (error) {
            toast.error(error.message || 'Error updating profile.');
            return;
        } finally {
            setLoading(false);
        }
    };

    if (loading && !user) {
        return <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>;
    }

    if (!user) {
        return <div className="alert alert-danger">No user data available.</div>;
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
                                                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                                First name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputEmail3" disabled={loading} {...register("first_name")} />
                                                                {errors.first_name && <p className="error">{errors.first_name.message}</p>}

                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                                Last name
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputEmail3" disabled={loading} {...register("last_name")} />
                                                                {errors.last_name && <p className="error">{errors.last_name.message}</p>}

                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                                                Email
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="email" className="form-control" id="inputEmail3" disabled={loading} {...register("email")} />
                                                                {errors.email && <p className="error">{errors.email.message}</p>}
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                                                Mobile No.
                                                            </label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="inputPassword3" disabled={loading} {...register("mobile_number")} />
                                                                {errors.mobile_number && <p className="error">{errors.mobile_number.message}</p>}
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary" disabled={loading}>
                                                            {loading ? (
                                                                <>
                                                                    <span
                                                                        className="spinner-border spinner-border-sm"
                                                                        role="status"
                                                                        aria-hidden="true"
                                                                    ></span>{" "}
                                                                    Updating...
                                                                </>
                                                            ) : (
                                                                "Update"
                                                            )}
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