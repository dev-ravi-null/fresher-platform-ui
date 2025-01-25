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

const drawerWidth = 240;

const Dashboard = ({ data }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selected, setSelected] = useState('profilePhoto');
    const [openDialog, setOpenDialog] = useState(false); // State to handle the dialog
    const navigate = useNavigate(); // Initialize useNavigate

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleSelect = (option) => {
        if (option === 'Logout') {
            setOpenDialog(true); // Show confirmation dialog when logging out
            return;
        }
        setSelected(option);
        if (mobileOpen) setMobileOpen(false); // Close drawer on selection in mobile  
    };

    const handleLogout = () => {
        setOpenDialog(false); // Close the dialog
        navigate('/'); // Redirect to the main page
    };

    const drawerIcons = {
        profilephoto: <AccountCircleIcon sx={{ color: 'green' }} />,
        resume: <DescriptionIcon sx={{ color: 'green' }} />,
        commits: <CodeIcon sx={{ color: 'green' }} />,
        interview: <EventIcon sx={{ color: 'green' }} />,
        skills: <SkillsIcon sx={{ color: 'red' }} />,
        logout: <LogoutIcon sx={{ color: 'red' }} />
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
                    backgroundImage: "linear-gradient(to right, #4facfe, #00f2fe)", // Gradient
                    color: "#fff", // Ensure text color is visible
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }} // Show on small screens
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                    <Box sx={{ ml: "auto", display: 'flex', gap: 2 }}> {/* Add 'gap' to space out the buttons */}
                        <Button variant="contained">Recruiter View</Button>
                        <Button variant="contained">Live</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better performance on mobile
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* Permanent drawer */}
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
                {/* Render selected content */}
                {data[selected]}
            </Box>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                show={openDialog}
                proceed={handleLogout} // Handle confirmation (logout)
                cancel={() => setOpenDialog(false)} // Handle cancellation
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
