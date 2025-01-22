import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import PostDataTable from "../../components/dataTable/PostDataTable";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

function PostList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        { key: "no", label: "Sr. No." },
        { key: "title", label: "Title" },
        { key: "description", label: "Description" },
        { key: "status", label: "Status" },
        { key: "author", label: "Author" },
        { key: "createdAt", label: "Created At" },
        { key: "action", label: "Action" },
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const token = localStorage.getItem('authToken');
            if (!token) {
                toast.success('Token not found. Please login again.');
                setLoading(false);
                return;
            }
            try {
                const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/posts`;
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Error fetching post data');
                }

                const transformedRows = data.data.map(post => ({
                    ...post,
                    createdAt: new Date(post.createdAt).toLocaleDateString(),
                }));

                setRows(transformedRows);

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

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
                                </span> Posts List
                            </h3>
                            <Link className="btn btn-primary" to="/posts/create" > Add New Post</Link>
                        </div>

                        <div className="row">
                            <div className="col-12 grid-margin">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="profile-class">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <PostDataTable rows={rows} columns={columns} setRows={setRows} />
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

export default PostList;