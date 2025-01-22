import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layouts/Sidebar";
import Footer from "../../components/layouts/Footer";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postSchema } from "../../validations/validation";
import FormFields from "./FormFields";
import { Link } from "react-router-dom";

function PostForm({ mode, postId }) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(postSchema),
        defaultValues: {
            title: "",
            description: "",
            image: null,
        },
    });

    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        if (mode === "edit" && postId) {
            const fetchPostData = async () => {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                if (!token) {
                    toast.error("Token not found. Please login again.");
                    setLoading(false);
                    return;
                }

                try {
                    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`;
                    const response = await fetch(apiUrl, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const responseData = await response.json();

                    if (!response.ok) {
                        throw new Error(responseData.message || "Failed to fetch post data.");
                    }

                    reset(responseData.data);
                    if (responseData.data.image) {
                        setExistingImages(responseData.data.image);
                    }
                } catch (error) {
                    toast.error(error.message || "Error fetching post data.");
                } finally {
                    setLoading(false);
                }
            };

            fetchPostData();
        }
    }, [mode, postId, reset]);

    const onSubmitHandler = async (data) => {
        setLoading(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Token not found. Please login again.");
            setLoading(false);
            return;
        }

        const { title, description, image } = data;
        const postData = new FormData();

        postData.append("title", title);
        postData.append("description", description);

        // Add files under the field name "image"
        if (image && image.length > 0) {
            Array.from(image).forEach((file) => {
                postData.append('image', file);
            });
        }

        try {
            const apiUrl =
                mode === "edit"
                    ? `${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`
                    : `${process.env.REACT_APP_BASE_URL}/api/posts`;

            const response = await fetch(apiUrl, {
                method: mode === "edit" ? "PUT" : "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: postData,
            });

            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message || "Unable to process request.");
            }

            toast.success(responseData.message);
            reset();
        } catch (error) {
            toast.error(error.message || "Error processing request.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-pencil"></i>
                            </span>
                            {mode === "edit" ? "Edit Post" : "Create New Post"}
                        </h3>
                        <Link className="btn btn-primary" to="/posts">
                            <i className="mdi mdi-arrow-left"></i>
                        </Link>
                    </div>

                    <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                                        <FormFields
                                            register={register}
                                            errors={errors}
                                            setValue={setValue}
                                            existingImages={existingImages}
                                        />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default PostForm;
