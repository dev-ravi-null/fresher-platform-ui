import React from "react";
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    Avatar,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CheckCircle from "@mui/icons-material/CheckCircle";

const FresherDetailed = () => {
    const navigate = useNavigate();
    const fresherDetails = useSelector((state) => state.fresherDetails.data.data);
    const auth = useSelector((state) => state.auth);

    if (!fresherDetails || !auth) {
        return <div>Loading...</div>;
    }

    const { fresherDetails: details, profileSummary } = fresherDetails;
    const { userId } = auth;

    const handleClick = () => {
        navigate("/dashboard");
    };

    return (
        <Box>
            <AppBar position="static" sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundImage: "linear-gradient(to right, #4facfe, #00f2fe)",
                color: "#fff",
            }}>
                <Toolbar>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
                        Radiant Coder
                    </Typography>
                    <Box sx={{ ml: "auto", display: 'flex', gap: 2 }}>
                        <Button variant="contained" onClick={handleClick}>
                            Dashboard
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ py: 5, px: { xs: 2, md: 10 }, display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 4, backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
                <Avatar src={details.photo} alt="Fresher Image" sx={{ width: 180, height: 180, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }} />
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
                        {userId} {/* Or details.name if available */}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
                        <b>Email:</b> {userId} {/* Or details.email if available */}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
                        <b>Phone:</b> {details.phone || "Not provided"}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {details.skills.map((skill, index) => (
                            <Chip key={index} label={skill} color="primary" size="small" />
                        ))}
                    </Stack>
                </Box>
            </Box>

            <Box sx={{ py: 5, px: { xs: 2, md: 10 } }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
                    Interview Experiences
                </Typography>
                <Carousel showThumbs={false} infiniteLoop autoPlay showStatus={false} emulateTouch interval={3000}>
                    {details.interviews && details.interviews.length > 0 ? (
                        details.interviews.map((interview, index) => {
                            const title = interview.title || `Interview ${index + 1}`;
                            const description = interview.description || "No description provided";
                            const date = interview.date ? new Date(interview.date).toLocaleDateString() : "Date not provided";
                            const company = interview.company || "Company not provided";

                            return (
                                <Box key={interview._id || index} sx={{ p: 4, borderRadius: 2, backgroundColor: "#fff", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#0d6efd" }}>
                                        {title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: "#555" }}>
                                        {description}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
                                        {company} - {date}
                                    </Typography>
                                </Box>
                            );
                        })
                    ) : (
                        <Typography variant="body1" sx={{ color: "#555", textAlign: 'center' }}>No interviews recorded yet.</Typography>
                    )}
                </Carousel>
            </Box>

            <Box sx={{ py: 5, px: { xs: 2, md: 10 }, backgroundColor: "#f8f9fa" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
                    Commits
                </Typography>
                <Grid container spacing={4}>
                    {profileSummary.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.month}>
                            <Card sx={{ borderRadius: 2, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0d6efd", mb: 1 }}>
                                        {item.month}
                                    </Typography>
                                    <Typography variant="body1">
                                        Commits: {item.commits}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ py: 5, px: { xs: 2, md: 10 } }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, color: "#333" }}>
                    Self Projects
                </Typography>
                <Grid container spacing={4}>
                    {details.selfProject.map((project, index) => (
                        <Grid item xs={12} sm={6} md={4} key={project._id || index}>
                            <Card sx={{ borderRadius: 2, boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
                            
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0d6efd" }}>
                                        {project.title || `Project ${index + 1}`}
                                    </Typography>
                                    <List dense={true}>
                                        {project.summary && (
                                            <ListItem>
                                                <ListItemIcon><CheckCircle /></ListItemIcon>
                                                <ListItemText primary={project.summary} />
                                            </ListItem>
                                        )}
                                        {project.liveLink && (
                                            <ListItem>
                                                <ListItemIcon><CheckCircle /></ListItemIcon>
                                                <ListItemText primary={<a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>} />
                                            </ListItem>
                                        )}
                                        {project.githubLink && (
                                            <ListItem>
                                                <ListItemIcon><CheckCircle /></ListItemIcon>
                                                <ListItemText primary={<a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub Repo</a>} />
                                            </ListItem>
                                        )}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ py: 3, textAlign: "center", backgroundColor: "#0d6efd", color: "#fff" }}>
                <Typography variant="body2">
                    © 2025 Fresher Platform. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default FresherDetailed; 
