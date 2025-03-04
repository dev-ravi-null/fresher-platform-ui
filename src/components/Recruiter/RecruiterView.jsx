import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useNavigate } from "react-router";
import Tooltip from "@mui/material/Tooltip";

import {
    fetchDetailsSuccess
} from '../../redux/fresherDetailsSlice';
import users from '../../mockData';
import { useDispatch, useSelector } from "react-redux";
const RecruiterView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const studentDataRedux = useSelector((state) => state.fresherDetails.data);
    let totalCommits = 0

    for (let index = 0; index < studentDataRedux.profileSummary.length; index++) {
        totalCommits += studentDataRedux.profileSummary[index].commits
    }

    const dashboardNavigate = () => {
        navigate('/dashboard');
    };
    const fresherdetailsNavigate = () => {
        navigate('/fresherdetails');
    }

    return (
        <>
            <Box>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Radiant Coder
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* Main Content */}
                <Box component="main" sx={{ p: 4, mt: 6 }}>
                    {/* Profile Cards */}
                    <Typography variant="h5" sx={{ display: "inline-block", backgroundColor: "#7ba6b3", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                        Students Profiles

                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {users.map((user, index) => (
                            <Grid item xs={12} sm={6} md={5} lg={4} key={index}>
                                <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                                    <CardMedia
                                        component="img"
                                        height="10"
                                        src={studentDataRedux.fresherDetails.photo}
                                        alt={user.username}
                                        sx={{ borderRadius: "50%", width: 100, height: 100, mx: "auto", mt: 2 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" textAlign={"center"} sx={{ fontWeight: "bold" }} >{user.username}</Typography>
                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Total Commits: {totalCommits}
                                            </Box>
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Total Interviews: {user.totalInterviews}
                                            </Box>
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Education: {user.education}
                                            </Box>
                                        </Typography>
                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Performance: {user.performance}
                                            </Box>
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Self Project:   {user.selfProject}
                                            </Box>
                                        </Typography>
                                        <Tooltip
                                            title={user.skills} placement="top"
                                            arrow componentsProps={{ tooltip: { sx: { backgroundColor: "#4caf50", color: "white", fontSize: "14px", padding: "8px", } }, }} >
                                            <Typography variant="body2" fontWeight={"bold"} color="textSecondary" sx={{ cursor: "pointer" }}>
                                                <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                    Skills :  ------
                                                </Box>

                                            </Typography>
                                        </Tooltip>
                                        <Button
                                            variant="contained" sx={{
                                                mt: 2, m: 0.9, backgroundImage: "linear-gradient(to right,rgb(64, 155, 235),rgb(63, 224, 233))",
                                                "&:hover": {
                                                    backgroundColor: "#654de4",
                                                    transform: "scale(1.05)",
                                                },
                                            }}
                                            onClick={fresherdetailsNavigate}
                                        >
                                            See More
                                        </Button>
                                        <Button
                                            variant="contained" sx={{
                                                mt: 2, m: 0.9, backgroundImage: "linear-gradient(to right,rgb(64, 155, 235),rgb(63, 224, 233))",
                                                "&:hover": { backgroundColor: "#654de4", transform: "scale(1.05)", },
                                            }}
                                            onClick={dashboardNavigate}
                                        >
                                            View Resume
                                        </Button>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default RecruiterView;