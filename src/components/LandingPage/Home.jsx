import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JobIllustration from "../../img/landing_page.svg";
import mainLogo from "../../img/main_logo.mp4";
import { Typewriter } from "react-simple-typewriter";


const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff5722",
    },
  },
  custom: {
    gradients: {
      primary: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    },
  },
});

const Home = () => {
  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            position: "relative",
            overflow: "hidden",
            flexDirection: "column",
            textAlign: "center",
            color: "white",
          }}
        >
          <Container sx={{ padding: 0 }}>
            <Grid container spacing={4} alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6}>
                <video
                  autoPlay
                  muted
                  loop
                  style={{
                    height: "50vh",
                    width: "auto",
                    maxWidth: "100%",
                  }}
                >
                  <source src={mainLogo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                  <Typography variant="h2" sx={{ fontWeight: "bold", color: "white" }}>
                    <Typewriter
                      words={["Just 5 Months", "Learn", "Practice", "Placed", "For Free"]}
                      loop={0}
                      cursor
                      cursorStyle="_"
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", backgroundColor: "#f5f5f5" }}>
          <Container>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" component="h1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                  Find Your Dream Job
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                  Kickstart your career with jobs designed for freshers. Collaborate, learn, and grow with opportunities
                  tailored just for you!
                </Typography>
                <Button variant="contained" color="secondary" size="large" sx={{ textTransform: "none" }}>
                  Explore Jobs
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box component="img" src={JobIllustration} alt="Job Search Illustration" sx={{ width: "100%", height: "auto" }} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
};

export { Home };
