import React from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";

function ChangePassword() {
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
                                            <form >
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        Old password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="email" className="form-control" id="inputEmail3" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        New password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control" id="inputEmail3"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="inputEmail3" className="col-sm-4 col-form-label">
                                                        Confirm new password
                                                    </label>
                                                    <div className="col-sm-8">
                                                        <input type="text" className="form-control" id="inputEmail3" />
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