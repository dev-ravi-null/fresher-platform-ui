import React, { useState } from "react";
import { Container, Grid, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        padding: "20px",
    },
    table: {
        minWidth: 650,
    },
    button: {
        marginBottom: "20px",
    },
    dialogTextField: {
        marginBottom: "15px",
    },
});

const Dashboard = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "johndoe@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "janesmith@example.com", role: "User" },
        { id: 3, name: "Tom Brown", email: "tombrown@example.com", role: "User" },
    ]);

    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ name: "", email: "", role: "" });
        handleClose();
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>

            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.button}>
                Add User
            </Button>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Button
                                        color="secondary"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New User</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        fullWidth
                        variant="outlined"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className={classes.dialogTextField}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className={classes.dialogTextField}
                    />
                    <TextField
                        margin="dense"
                        label="Role"
                        fullWidth
                        variant="outlined"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className={classes.dialogTextField}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddUser} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
