import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button
} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { status } from '../../utils/constant';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import FsLightbox from "fslightbox-react";

function PostDataTable({ rows, columns, setRows }) {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isGalleryVisible, setGalleryVisible] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    // Handle Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    // Open LightGallery with images
    const handleImageAction = (image) => {
        if (!image || image.length === 0) {
            console.warn('No images available for this post.');
            return;
        }

        // Map the images to the required format for FsLightbox
        const formattedImages = image.map((image) => `${process.env.REACT_APP_BASE_URL}/images/uploads/${image}`);

        setSelectedImages(formattedImages);
        setGalleryVisible(true);
    };


    const handleDelete = async (postId) => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {

                const token = localStorage.getItem("authToken");
                if (!token) {
                    toast.error("Token not found. Please login again.");
                    return;
                }
                // Perform delete request
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts/${postId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || "Failed to delete post.");
                }

                // Notify success
                Swal.fire("Deleted!", "The post has been deleted.", "success");

                // Update the rows state
                setRows((prevRows) => prevRows.filter((row) => row._id !== postId));
            } catch (error) {
                // Notify error
                Swal.fire("Error!", error.message || "Something went wrong!", "error");
            }
        }
    };


    // Handle Search/Filter
    const filteredRows = rows.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Handle Sorting
    const handleSort = (key) => {
        const isAsc = sortConfig.key === key && sortConfig.direction === 'asc';
        setSortConfig({ key, direction: isAsc ? 'desc' : 'asc' });
    };

    const sortedRows = [...filteredRows].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Paginate Rows - Adjust page to work correctly with 1-based index
    const paginatedRows = sortedRows.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    // Open Modal
    const handleView = (post) => {
        setSelectedPost(post);
        setOpenDialog(true);
    };

    // Close Modal
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedPost(null);
    };

    return (
        <div>
            <Grid container spacing={3} justifyContent="space-between" style={{ marginBottom: 20 }}>
                <Grid item>
                    <FormControl variant="outlined" size="small">
                        <InputLabel>Rows Per Page</InputLabel>
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            label="Rows Per Page">
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
            </Grid>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    onClick={() => handleSort(column.key)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {column.label} {sortConfig.key === column.key ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                                {columns.slice(1).map((column) => (
                                    <TableCell key={column.key} >
                                        {column.key === 'status'
                                            ? status[row[column.key]] || row[column.key]
                                            : column.key === 'author'
                                                ? row[column.key]?.name || 'N/A'
                                                : row[column.key]}
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <button onClick={() => handleImageAction(row.image || [])}>
                                        <i className="mdi mdi-file-image"></i>
                                    </button>

                                    <button style={{ marginLeft: "4px" }}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleView(row)}>
                                        <i className="mdi mdi-eye"></i>
                                    </button>

                                    <button style={{ marginLeft: "4px" }}>
                                        <Link to={`/posts/edit/${row._id}`} >
                                            <i className="mdi mdi-square-edit-outline"></i>
                                        </Link>
                                    </button>
                                    <button style={{ marginLeft: "4px" }} onClick={() => handleDelete(row._id)}>
                                        <i className="mdi mdi-trash-can"></i>
                                    </button>

                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            <Pagination
                count={Math.ceil(sortedRows.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
                variant="outlined"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />

            <FsLightbox
                toggler={isGalleryVisible}
                sources={selectedImages}
            />



            {/* Dialog for Post Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>Post Details</DialogTitle>
                <DialogContent>
                    {selectedPost ? (
                        <div>
                            {Object.entries({
                                title: "Title",
                                description: "Description",
                                author: "Author Name",
                                status: "Status",
                                createdAt: "Account Created",
                            }).map(([key, label]) => (
                                <p key={key}>
                                    <strong>{label}: </strong>
                                    {key === "status"
                                        ? status[selectedPost.status] || "N/A"
                                        : selectedPost[key]
                                    }
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p>No details available</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PostDataTable;
