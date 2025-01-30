import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Box, Typography, Button, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import JobIllustration from "../img/landing_page.svg"; // Adjust the path as needed

const theme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2", // Solid color
    },
    secondary: {
      main: "#ff5722", // Solid color
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
            backgroundColor: "#f5f5f5",
          }}
        >
          <Container>
            <Grid container spacing={4} alignItems="center">
              {/* Left Section */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                  }}
                >
                  Find Your Dream job
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                  Kickstart your career with jobs designed for freshers.
                  Collaborate, learn, and grow with opportunities tailored just for you!
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ textTransform: "none" }}
                >
                  Explore Jobs
                </Button>
              </Grid>

              {/* Right Section */}
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={JobIllustration}
                  alt="Job Search Illustration"
                  sx={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
      <Box sx={{ backgroundColor: "gray", py: 3, position: "relative", bottom: 0, width: "100%" }}>
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            © 2025 Radiant Coder. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>

  );
};

export { Home };
