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
    Button,
    Chip,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
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
                    <Box sx={{ ml: "auto" }}>
                        <Button variant="contained" onClick={handleClick}>
                            Dashboard
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Profile Section */}
            <Container sx={{ py: 5 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4} display="flex" justifyContent="center">
                        <Avatar src={details.photo} alt="Fresher" sx={{ width: 180, height: 180, boxShadow: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>{userId}</Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}><b>Email:</b> {userId}</Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}><b>Phone:</b> {details.phone || "Not provided"}</Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* Skills Section */}
            <Box sx={{ py: 5, backgroundColor: "#f8f9fa" }}>
                <Container>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>Skills</Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                        {details.skills.map((skill, index) => (
                            <Chip key={index} label={skill} color="primary" size="small" />
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* Interview Experiences */}
            <Container sx={{ py: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>Interview Experiences</Typography>
                <Carousel showThumbs={false} infiniteLoop autoPlay showStatus={false} emulateTouch interval={3000}>
                    {details.interviews?.length ? (
                        details.interviews.map((interview, index) => (
                            <Box key={interview._id || index} sx={{ p: 4, borderRadius: 2, backgroundColor: "#fff", boxShadow: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: "#0d6efd" }}>{interview.title || `Interview ${index + 1}`}</Typography>
                                <Typography variant="body1">{interview.description || "No description provided"}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>{interview.company || "Company not provided"} - {interview.date ? new Date(interview.date).toLocaleDateString() : "Date not provided"}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center' }}>No interviews recorded yet.</Typography>
                    )}
                </Carousel>
            </Container>

            {/* Commits Section */}
            <Box sx={{ py: 5, backgroundColor: "#f8f9fa" }}>
                <Container>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>Commits</Typography>
                    <Grid container spacing={4}>
                        {profileSummary.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.month}>
                                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0d6efd", mb: 1 }}>{item.month}</Typography>
                                        <Typography variant="body1">Commits: {item.commits}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Self Projects Section */}
            <Container sx={{ py: 5 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>Self Projects</Typography>
                <Grid container spacing={4}>
                    {details.selfProject.map((project, index) => (
                        <Grid item xs={12} sm={6} md={4} key={project._id || index}>
                            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0d6efd" }}>{project.title || `Project ${index + 1}`}</Typography>
                                    <List dense>
                                        {project.summary && <ListItem><ListItemIcon><CheckCircle /></ListItemIcon><ListItemText primary={project.summary} /></ListItem>}
                                        {project.liveLink && <ListItem><ListItemIcon><CheckCircle /></ListItemIcon><ListItemText primary={<a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a>} /></ListItem>}
                                        {project.githubLink && <ListItem><ListItemIcon><CheckCircle /></ListItemIcon><ListItemText primary={<a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub Repo</a>} /></ListItem>}
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Footer */}
            <Box sx={{ py: 3, textAlign: "center", backgroundColor: "#0d6efd", color: "#fff" }}>
                <Typography variant="body2">© 2025 Fresher Platform. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default FresherDetailed;
