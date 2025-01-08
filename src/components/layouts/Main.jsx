import React from "react";
import Sidebar from './Sidebar';
import Footer from "./Footer";

function Main() {
    return (
        <>
            <div className="container-fluid page-body-wrapper">
                <Sidebar />
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                    <i className="mdi mdi-home"></i>
                                </span> Dashboard
                            </h3>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item active" aria-current="page">
                                        <span></span>Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle"></i>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card bg-gradient-danger card-img-holder text-white">
                                    <div className="card-body">
                                        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                        <h4 className="font-weight-normal mb-3">Total Users <i className="mdi mdi-chart-line mdi-24px float-end"></i>
                                        </h4>
                                        <h2 className="mb-5">15</h2>
                                        {/* <h6 className="card-text">Increased by 60%</h6> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card bg-gradient-info card-img-holder text-white">
                                    <div className="card-body">
                                        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                        <h4 className="font-weight-normal mb-3">Total Queries<i className="mdi mdi-bookmark-outline mdi-24px float-end"></i>
                                        </h4>
                                        <h2 className="mb-5">34</h2>
                                        {/* <h6 className="card-text">Decreased by 10%</h6> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card bg-gradient-success card-img-holder text-white">
                                    <div className="card-body">
                                        <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
                                        <h4 className="font-weight-normal mb-3">Visitors Online <i className="mdi mdi-eye mdi-24px float-end"></i>
                                        </h4>
                                        <h2 className="mb-5">741</h2>
                                        {/* <h6 className="card-text">Increased by 5%</h6> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Users List</h4>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th> Name </th>
                                                        <th> Email </th>
                                                        <th> Contact </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <img src="assets/images/faces/face1.jpg" className="me-2" alt="image" /> David Grey
                                                        </td>
                                                        <td> Fund is not recieved </td>
                                                        <td>
                                                            <label>7878787878</label>
                                                        </td>

                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src="assets/images/faces/face2.jpg" className="me-2" alt="image" /> Stella Johnson
                                                        </td>
                                                        <td> High loading time </td>
                                                        <td>
                                                            <label>9909099007</label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <img src="assets/images/faces/face3.jpg" className="me-2" alt="image" /> Marina Michel
                                                        </td>
                                                        <td> Website down for one week </td>
                                                        <td>
                                                            <label>7878898988</label>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
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

export default Main;