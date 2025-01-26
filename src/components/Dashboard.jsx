import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import EventIcon from '@mui/icons-material/Event';
import SkillsIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmDialog from './ConfirmDialog'; // Import the custom ConfirmDialog
import AnalyticsIcon from '@mui/icons-material/Analytics';
const drawerWidth = 240;

const Dashboard = ({ data }) => {
    const initialSelectedKey = Object.keys(data)[0]; // Get the first key from data
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selected, setSelected] = useState(initialSelectedKey); // Default to the first key
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelect = (option) => {
        if (option === 'Logout') {
            setOpenDialog(true);
            return;
        }
        setSelected(option);
        if (mobileOpen) setMobileOpen(false);
    };

    const handleLogout = () => {
        setOpenDialog(false);
        navigate('/');
    };
    const handleClick = () => {
        navigate('/recruiter-view');

    }
    const goLive = () => {
        navigate('/fresherdetails');
    }
    const drawerIcons = {
        chart: <AnalyticsIcon sx={{ color: 'green' }} />,
        profilephoto: <AccountCircleIcon sx={{ color: 'green' }} />,
        resume: <DescriptionIcon sx={{ color: 'green' }} />,
        commits: <CodeIcon sx={{ color: 'green' }} />,
        interview: <EventIcon sx={{ color: 'green' }} />,
        skills: <SkillsIcon sx={{ color: 'red' }} />,
        logout: <LogoutIcon sx={{ color: 'red' }} />,
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {Object.keys(data).map((key) => (
                    <ListItem
                        button
                        key={key}
                        onClick={() => handleSelect(key)}
                        selected={selected === key}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ListItemIcon>{drawerIcons[key.toLowerCase()]}</ListItemIcon>
                        <ListItemText primary={key.replace(/([A-Z])/g, ' $1')} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                    <Box sx={{ ml: "auto", display: 'flex', gap: 2 }}>
                        <Button variant="contained" onClick={handleClick}>
                            Recruiter View
                        </Button>                        <Button variant="contained" onClick={goLive}>Live</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {data[selected]} {/* Render the selected content */}
            </Box>
            <ConfirmDialog
                show={openDialog}
                proceed={handleLogout}
                cancel={() => setOpenDialog(false)}
                title="Logout"
                content="Are you sure you want to log out?"
                cancelText="Cancel"
                confirmText="Logout"
            />
        </Box>
    );
};

Dashboard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Dashboard;