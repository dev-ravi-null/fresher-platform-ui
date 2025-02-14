import React, { useState } from "react";
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
import { Sidebar, Menu, MenuItem, SubMenu, ProSidebarProvider } from "react-pro-sidebar";
import { useNavigate } from "react-router";
import Tooltip from "@mui/material/Tooltip";



const drawerWidth = 220;

const users = [
    {
        username: "ANUJ KUMAR",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        selfProject: 3,
        totalCommits: 20,
        totalInterviews: 2,
        workingHours: 100,
        education: "MCA",
        performance: 0,
        skills: "React.js, JavaScript, Node.js, MongoDB,Java",
    },
    {
        username: "ANUJ KUMAR",
        avatar: "https://avatars.githubusercontent.com/u/1?v=4",
        selfProject: 3,
        totalCommits: 20,
        totalInterviews: 2,
        workingHours: 100,
        education: "MCA",
        performance: 0,
        skills: "React.js, JavaScript, Node.js, MongoDB,Java",
    },
    {
        username: "RAVI SHARMA",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        selfProject: 5,
        totalCommits: 15,
        totalInterviews: 3,
        workingHours: 220,
        education: "B.tech",
        performance: 0,
        skills: "React.js, JavaScript, Node.js, MongoDB,Java ,React.js, JavaScript, Node.js, MongoDB",
    },
    {
        username: "RAVI SHARMA",
        avatar: "https://avatars.githubusercontent.com/u/2?v=4",
        selfProject: 5,
        totalCommits: 15,
        totalInterviews: 3,
        workingHours: 220,
        education: "B.tech",
        performance: 0,
        skills: "React.js, JavaScript, Node.js, MongoDB,Java ,React.js, JavaScript, Node.js, MongoDB",
    },
    {
        username: "NARAYAN SHARMA",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        selfProject: 2,
        totalCommits: 25,
        totalInterviews: 1,
        workingHours: 90,
        education: "MCA",
        performance: 0,
        skills: "React.js, JavaScript, Node.js",
    },
    {
        username: "NARAYAN SHARMA",
        avatar: "https://avatars.githubusercontent.com/u/3?v=4",
        selfProject: 2,
        totalCommits: 25,
        totalInterviews: 1,
        workingHours: 90,
        education: "MCA",
        performance: 0,
        skills: "React.js, JavaScript, Node.js",
    },
    {
        username: "MOHIT KUMAR",
        avatar: "https://avatars.githubusercontent.com/u/4?v=4",
        selfProject: 1,
        totalCommits: 30,
        totalInterviews: 0,
        workingHours: 10,
        education: "BA",
        performance: 0,
        skills: "React.js, JavaScript",
    },
    {
        username: "MOHIT KUMAR",
        avatar: "https://avatars.githubusercontent.com/u/4?v=4",
        selfProject: 1,
        totalCommits: 30,
        totalInterviews: 0,
        workingHours: 10,
        education: "BA",
        performance: 0,
        skills: "React.js, JavaScript",
    },
];

const RecruiterView = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const dashboardNavigate = () => {
        navigate('/dashboard');
    };
    const fresherdetailsNavigate = () => {
        navigate('/fresherdetails');
    }

    return (
        <ProSidebarProvider>
            <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                {/* AppBar */}
                <AppBar
                    position="fixed"
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundImage: "linear-gradient(to right, #4facfe, #00f2fe)",
                        color: "#fff",
                    }}
                >
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Radiant Coder
                        </Typography>
                        {/* <Box sx={{ ml: "auto", display: 'flex', gap: 2 }}>
                            <Button variant="contained" onClick={dashboardNavigate}>
                                Dashboard
                            </Button>
                        </Box> */}
                    </Toolbar>
                </AppBar>

                {/* Sidebar */}
                {/* <Sidebar
                    style={{
                        width: drawerWidth,
                        position: "fixed",
                        top: 0,
                        left: mobileOpen ? 0 : "-100%",
                        height: "100%",
                        transition: "left 0.3s ease-in-out",
                    }}
                >
                    <Menu>
                        <br />
                        <MenuItem>Filters</MenuItem>
                        <br />
                        <SubMenu label="Job Types">
                            <MenuItem>Full-Time</MenuItem>
                            <MenuItem>Part-Time</MenuItem>
                            <MenuItem>Internship</MenuItem>
                            <MenuItem>Remote</MenuItem>
                        </SubMenu>
                        <br />
                        <MenuItem>
                            Salary Range
                            <Box>
                                <input type="range" min="10000" max="50000" />
                                <br />
                                <Button variant="contained" sx={{ mt: 2 }} fullWidth>
                                    Apply
                                </Button>
                            </Box>
                        </MenuItem>
                    </Menu>
                </Sidebar> */}

                {/* Main Content */}
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    {/* Profile Cards */}
                    <Typography variant="h5" sx={{ display: "inline-block", backgroundColor: "#aab7b8", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                        Profiles
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {users.map((user, index) => (
                            <Grid item xs={12} sm={6} md={5} lg={3} key={index}>
                                <Card sx={{ textAlign: "center", boxShadow: 7 }}>
                                    <CardMedia
                                        component="img"
                                        height="10"
                                        src={user.avatar}
                                        alt={user.username}
                                        sx={{ borderRadius: "50%", width: 100, height: 100, mx: "auto", mt: 2 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h5" textAlign={"center"} sx={{ fontWeight: "bold" }} >{user.username}</Typography>
                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Total Commits: {user.totalCommits}
                                            </Box>
                                        </Typography>
                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Total Interviews: {user.totalInterviews}
                                            </Box>
                                        </Typography>

                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Education: {user.education}
                                            </Box>
                                        </Typography>
                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Performance: {user.performance}
                                            </Box>
                                        </Typography>
                                        <Typography variant="body2" fontWeight={"bold"} color="textSecondary">
                                            <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                Self Project:   {user.selfProject}
                                            </Box>
                                        </Typography>
                                        <Tooltip
                                            title={user.skills} placement="top"
                                            arrow componentsProps={{ tooltip: { sx: { backgroundColor: "#4caf50", color: "white", fontSize: "14px", padding: "8px", } }, }} >
                                            <Typography variant="body2" fontWeight={"bold"} color="textSecondary" sx={{ cursor: "pointer" }}>
                                                <Box sx={{ display: "inline-block", backgroundColor: "#d9d9d9", padding: "2px 5px", fontWeight: "bold", mb: 1, mt: 1, borderRadius: "4px" }}>
                                                    Skills :  ------
                                                </Box>

                                            </Typography>
                                        </Tooltip>
                                        <Button
                                            variant="contained" sx={{
                                                mt: 2, m: 0.9, backgroundColor: "#7b61ff",
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
                                                mt: 2, m: 0.9, backgroundColor: "#7b61ff",
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
        </ProSidebarProvider>
    );
};

export default RecruiterView;
