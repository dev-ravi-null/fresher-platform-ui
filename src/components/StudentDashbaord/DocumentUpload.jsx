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
import { PDFDocument } from "pdf-lib";

const DocumentUpload = ({ type }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fresherDetails = useSelector((state) => state.fresherDetails?.data?.data);
  const storedPhoto = fresherDetails?.fresherDetails.photo || null;
  const storedResume = fresherDetails?.fresherDetails.resume || null;

  const upload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage("No file selected for upload!");
      return;
    }

    setLoading(true);
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append(type === "Resume" ? "resume" : "photo", selectedFiles[0]);
    formData.append("userId", userId);

    try {
      const endpoint =
        type === "Resume"
          ? "https://fresher-backend.onrender.com/api/fresher-details/upload-resume"
          : "https://fresher-backend.onrender.com/api/fresher-details/upload-photo";

      const response = await fetch(endpoint, { method: "POST", body: formData });
      const result = await response.json();

      if (response.ok) {
        setMessage(`${type} uploaded successfully!`);
        setTimeout(() => location.reload(), 2000);
      } else {
        setMessage(result.message || `Error uploading ${type}!`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setMessage("Unexpected error occurred!");
    } finally {
      setLoading(false);
    }
  };

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
        disabled={!selectedFiles || loading}
        onClick={upload}
        sx={{ mb: 3 }}
      >
        {loading ? "Uploading..." : "Upload"}
      </Button>

      {message && (
        <Alert severity={message.includes("successfully") ? "success" : "error"} sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {type === "Photo" && storedPhoto && (
        <Card style={{ width: "370px", height: "370px", borderRadius: "8px" }}>
          <CardContent>
            <img src={storedPhoto} alt="Uploaded" style={{ width: "350px", height: "350px", borderRadius: "8px" }} />
          </CardContent>
        </Card>
      )}

      {type === "Resume" && storedResume && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Resume
            </Typography>
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