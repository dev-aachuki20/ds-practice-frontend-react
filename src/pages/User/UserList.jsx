import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import DataTable from "../../components/dataTable/DataTable";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UserList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        { key: "no", label: "Sr. No." },
        { key: "first_name", label: "First Name" },
        { key: "last_name", label: "Last Name" },
        { key: "email", label: "Email" },
        { key: "mobile_number", label: "Mobile Number" },
        { key: "createdAt", label: "Created At" },
        { key: "action", label: "Action" },
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.success('Token not found. Please login again.');
                setLoading(false);
                return;
            }
            try {
                const apiUrl = `${process.env.REACT_APP_BASE_URL}/users`;
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error fetching user data');
                }

                const transformedRows = data.data.map(user => ({
                    ...user,
                    createdAt: new Date(user.createdAt).toLocaleDateString(),
                }));
                setRows(transformedRows);

            } catch (error) {
                console.error("Error fetching users:", error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();

    }, [])

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
                                </span> Users List
                            </h3>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-class">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <DataTable rows={rows} columns={columns} />
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

export default UserList;