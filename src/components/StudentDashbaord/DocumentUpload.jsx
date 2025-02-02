import React, { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { PDFDocument } from "pdf-lib"; // Import pdf-lib
import axios from "axios"; // For fetching raw file data

const DocumentUpload = ({ type }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  // Extracting data from Redux
  const fresherDetails = useSelector((state) => state.fresherDetails?.data?.data);
  const storedPhoto = fresherDetails?.photo || null;
  const storedResume = fresherDetails?.resume || null;

  // Handle file upload
  const upload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage("No file selected for upload!");
      return;
    }

    const userId = "678d2f0a7221da2838c1d48d";
    const formData = new FormData();
    formData.append(type === "Resume" ? "resume" : "photo", selectedFiles[0]);
    formData.append("userId", userId);

    try {
      const endpoint =
        type === "Resume"
          ? "https://fresher-backend.onrender.com/api/fresher-details/upload-resume"
          : "https://fresher-backend.onrender.com/api/fresher-details/upload-photo";

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(`${type} uploaded successfully!`);
        setTimeout(() => {
          location.reload();
        }, 2000);
        console.log(result);
      } else {
        setMessage(result.message || `Error uploading ${type}!`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Unexpected error occurred!");
    }
  };

  // Handle dropzone file selection
  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: type === "Resume" ? "application/pdf" : "image/*",
  });

  // Convert raw image to PDF
  const convertImageToPdf = async (imageData) => {
    // Create a PDF document
    const pdfDoc = await PDFDocument.create();

    // Embed image (assuming imageData is a Blob)
    const image = await pdfDoc.embedJpg(imageData); // or embedPng depending on the image format
    const { width, height } = image.scale(0.5); // Scale the image to fit nicely

    // Add a page and draw the image
    const page = pdfDoc.addPage();
    page.drawImage(image, {
      x: 50,
      y: 500,
      width,
      height,
    });

    // Save the PDF and create a URL to display it
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    setPdfUrl(pdfUrl);
  };

  // Fetch image file and convert to PDF after drop/upload
  const handleImageUpload = async (file) => {
    const imageData = await readFileAsBlob(file);
    convertImageToPdf(imageData);
  };

  const readFileAsBlob = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {type} Upload
      </Typography>

      {progress > 0 && (
        <Box sx={{ mb: 3 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="textSecondary">
            {progress}%
          </Typography>
        </Box>
      )}

      <Box
        {...getRootProps({
          style: {
            border: "2px dashed #ccc",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "20px",
          },
        })}
      >
        <input {...getInputProps()} />
        {selectedFiles && selectedFiles[0]?.name ? (
          <Typography variant="body1" color="primary">
            Selected File: {selectedFiles[0].name}
          </Typography>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Drag and drop a file here, or click to select a file
          </Typography>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        disabled={!selectedFiles}
        onClick={upload}
        sx={{ mb: 3 }}
      >
        Upload
      </Button>

      {message && (
        <Alert
          severity={message.includes("successfully") ? "success" : "error"}
          sx={{ mb: 3 }}
        >
          {message}
        </Alert>
      )}

      {/* Show uploaded photo */}
      {type === "Photo" && storedPhoto && (
        <Card style={{ width: "370px", height: "370px", borderRadius: "8px" }}>
          <CardContent>
            <img
              src={storedPhoto}
              alt="Uploaded"
              style={{ width: "350px", height: "350px", borderRadius: "8px" }}
            />
          </CardContent>
        </Card>
      )}

      {/* Show resume PDF as an embedded document */}
      {type === "Resume" && storedResume && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Resume
            </Typography>
            {/* Show the PDF URL if converted */}
            {pdfUrl && (
              <iframe
                src={pdfUrl}
                title="Converted PDF"
                width="100%"
                height="500px"
                style={{ border: "none", marginTop: "10px" }}
              />
            )}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default DocumentUpload;
