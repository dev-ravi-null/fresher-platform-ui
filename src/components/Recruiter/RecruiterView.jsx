import React, { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import {
    Sidebar,
    Menu,
    MenuItem,
    SubMenu,
    ProSidebarProvider,
} from "react-pro-sidebar";
import { useNavigate } from "react-router";

const drawerWidth = 240;

const RecruiterView = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const dashboardNavigate = () => {
        navigate('/dashboard');
    };

    const sampleJobs = Array.from({ length: 12 }, (_, index) => ({
        title: `Job Title ${index + 1}`,
        company: `Company ${index + 1}`,
        location: "Remote",
        salary: `₹${5000 + index * 5000} PA`,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    }));

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
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Recruiter View
                        </Typography>
                        <Box sx={{ ml: "auto", display: 'flex', gap: 2 }}>
                            <Button variant="contained" onClick={dashboardNavigate}>
                                Dashboard
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Sidebar */}
                <Sidebar
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
                </Sidebar>

                {/* Main Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        mt: 8, // For AppBar height
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Job Listings
                    </Typography>
                    <Grid container spacing={3}>
                        {sampleJobs.map((job, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        boxShadow: "0px 4px 10px rgba(0, 167, 239, 0.1)",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6">{job.title}</Typography>
                                        <Typography color="textSecondary">{job.company}</Typography>
                                        <Typography>{job.location}</Typography>
                                        <Typography>{job.salary}</Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            sx={{ mt: 1 }}
                                        >
                                            {job.description}
                                        </Typography>
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
