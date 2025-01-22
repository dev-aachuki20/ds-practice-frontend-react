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
import { role, status } from '../../utils/constant';

function UserDataTable({ rows, columns }) {
    console.log('rows', rows)
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    // Handle Pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
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
    const handleView = (user) => {
        setSelectedUser(user);
        setOpenDialog(true);
    };

    // Close Modal
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
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
                                        {column.key === 'role' ? role[row[column.key]] || row[column.key]
                                            : column.key === 'status' ? status[row[column.key]] || row[column.key]
                                                : row[column.key]}
                                    </TableCell>
                                ))}
                                <TableCell style={{ marginLeft: 0, paddingLeft: 0 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleView(row)}
                                    >
                                        View
                                    </Button>
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



            {/* Dialog for User Details */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent>
                    {selectedUser ? (
                        <div>
                            {Object.entries({
                                first_name: "First Name",
                                last_name: "Last Name",
                                email: "Email Address",
                                mobile_number: "Mobile Number",
                                role: "Role",
                                status: "Status",
                                createdAt: "Account Created",
                            }).map(([key, label]) => (
                                <p key={key}>
                                    <strong>{label}:</strong>
                                    {key === "role"
                                        ? role[selectedUser.role] || "N/A"
                                        : key === "status"
                                            ? status[selectedUser.status] || "N/A"
                                            : selectedUser[key]
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

export default UserDataTable;
