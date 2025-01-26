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
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FresherDetailed = () => {
  return (
    <Box>
      {/* Header Section */}
      <AppBar position="static" sx={{ background: "#0d6efd" }}>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#fff" }}>
            Fresher Profile
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Basic Info Section */}
      <Box
        sx={{
          py: 5,
          px: { xs: 2, md: 10 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 4,
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Avatar
          src="https://via.placeholder.com/180"
          alt="Fresher Image"
          sx={{
            width: 180,
            height: 180,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#333",
            }}
          >
            John Doe
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
            <b>Email:</b> john.doe@example.com
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
            <b>Phone:</b> +91 9876543210
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: "#555" }}>
            <b>Skills:</b> React, Node.js, CSS, JavaScript
          </Typography>
        </Box>
      </Box>

      {/* Carousel Section */}
      <Box sx={{ py: 5, px: { xs: 2, md: 10 } }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#333",
          }}
        >
          Interview Experiences
        </Typography>
        <Carousel
          showThumbs={false}
          infiniteLoop
          autoPlay
          showStatus={false}
          emulateTouch
          interval={3000}
        >
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Box
              key={index}
              sx={{
                p: 4,
                borderRadius: 2,
                backgroundColor: "#fff",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  color: "#0d6efd",
                }}
              >
                Interview {item}
              </Typography>
              <Typography variant="body1" sx={{ color: "#555" }}>
                This is a detailed description of interview experience {item}.
                It highlights the questions asked, feedback provided, and
                takeaways for improvement.
              </Typography>
            </Box>
          ))}
        </Carousel>
      </Box>

      {/* Fresher Commits & Projects Section */}
      <Box sx={{ py: 5, px: { xs: 2, md: 10 }, backgroundColor: "#f8f9fa" }}>
        <Grid container spacing={4}>
          {/* Commits Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300x140"
                alt="Commit Example"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#0d6efd" }}
                >
                  Recent Commits
                </Typography>
                <ul>
                  <li>Commit 1: Fixed bug in login page</li>
                  <li>Commit 2: Improved dashboard responsiveness</li>
                  <li>Commit 3: Added API integration for data fetching</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>

          {/* Self Projects Section */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/300x140"
                alt="Project Example"
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#0d6efd" }}
                >
                  Self Projects
                </Typography>
                <ul>
                  <li>
                    <b>Todo App:</b> A React-based task manager with local
                    storage support.
                  </li>
                  <li>
                    <b>Portfolio Website:</b> A modern, responsive portfolio
                    showcasing projects and skills.
                  </li>
                  <li>
                    <b>E-commerce App:</b> Built with React and Node.js,
                    featuring dynamic product listings.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          backgroundColor: "#0d6efd",
          color: "#fff",
        }}
      >
        <Typography variant="body2">
          © 2025 Fresher Platform. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default FresherDetailed;
