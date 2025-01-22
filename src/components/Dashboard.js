import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';

const drawerWidth = 240;

const Dashboard = ({ data }) => {
    const [selected, setSelected] = useState('profilePhoto');

    const handleSelect = (option) => {
        setSelected(option);
    };

    const drawer = (
        <div>
            <Toolbar />
            <List>
                {Object.keys(data).map((key) => (
                    <ListItem button key={key} onClick={() => handleSelect(key)}>
                        <ListItemText primary={key.replace(/([A-Z])/g, ' $1')} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        '& .MuiDrawer-paper': { width: drawerWidth },
                    }}
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
        </Box>
    );
};

Dashboard.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Dashboard;
