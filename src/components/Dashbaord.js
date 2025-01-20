import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CssBaseline,
    useMediaQuery,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "#6200ea",
        color: "white",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: 240,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: 240,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: theme.spacing(8),
    },
    section: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        backgroundColor: "white",
        borderRadius: 8,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
}));

const Dashboard = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [mobileOpen, setMobileOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState("Commits");
    const [commits, setCommits] = useState([]);
    const [skills, setSkills] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDialogOpen = (type) => {
        setDialogType(type);
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
        setInputValue("");
    };

    const handleAdd = () => {
        if (dialogType === "Commits") {
            setCommits([...commits, inputValue]);
        } else if (dialogType === "Skills") {
            setSkills([...skills, inputValue]);
        }
        handleDialogClose();
    };

    const renderSection = () => {
        switch (currentSection) {
            case "Commits":
                return (
                    <div className={classes.section}>
                        <Typography variant="h6">Commits</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDialogOpen("Commits")}
                        >
                            Add Commit
                        </Button>
                        <ul>
                            {commits.map((commit, index) => (
                                <li key={index}>{commit}</li>
                            ))}
                        </ul>
                    </div>
                );
            case "Resume":
                return (
                    <div className={classes.section}>
                        <Typography variant="h6">Resume</Typography>
                        <input type="file" />
                    </div>
                );
            case "Interviews":
                return (
                    <div className={classes.section}>
                        <Typography variant="h6">Interviews</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => console.log("Request Interview API Call")}
                        >
                            Request Interview
                        </Button>
                        <input type="file" multiple />
                    </div>
                );
            case "Skills":
                return (
                    <div className={classes.section}>
                        <Typography variant="h6">Skills</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDialogOpen("Skills")}
                        >
                            Add Skill
                        </Button>
                        <ul>
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    const drawerContent = (
        <List>
            {["Commits", "Resume", "Interviews", "Skills"].map((text) => (
                <ListItem
                    button
                    key={text}
                    onClick={() => {
                        setCurrentSection(text);
                        if (isMobile) setMobileOpen(false); // Close drawer on mobile
                    }}
                >
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Admin Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                <Drawer
                    variant={isMobile ? "temporary" : "permanent"}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Improve performance on mobile
                    }}
                >
                    {drawerContent}
                </Drawer>
            </nav>

            <main className={classes.content}>{renderSection()}</main>

            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <DialogTitle>{`Add ${dialogType}`}</DialogTitle>
                <DialogContent>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`Enter ${dialogType}`}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Dashboard;
