import React, { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { uploadPhoto, uploadResume } from "../api/api";
const DocumentUpload = ({ type }) => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);

  const upload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage("No file selected for upload!");
      return;
    }
        const formData = new FormData();
        formData.append("photo", file); // Matches "photo"
        formData.append("userId", userId);
      
        try {
          const response = await fetch("https://fresher-backend.onrender.com/api/fresher-details/upload-photo", {
            method: "POST",
            body: formData,
          });
      
          const result = await response.json();
          if (response.ok) {
            console.log("Photo uploaded successfully:", result);
          } else {
            console.error("Error uploading photo:", result.message);
          }
        } catch (error) {
          console.error("Unexpected error:", error);
      }
      
    // const formData = new FormData();
    // const endpoint = type === "Resume" ? uploadResume : uploadPhoto; // Select correct API endpoint
    // formData.append(type === "Resume" ? "resume" : "photo", selectedFiles[0]);
    // formData.append("userId", "678d2f0a7221da2838c1d48d");

    // setProgress(0);
    // setCurrentFile(selectedFiles[0]);

    // try {
    //   await endpoint(formData);
    //   setMessage("File uploaded successfully!");
    //   setFileInfos((prevInfos) => [
    //     ...prevInfos,
    //     { name: selectedFiles[0].name, url: "#" }, // Use real URL if provided by backend
    //   ]);
    //   setCurrentFile(null);
    // } catch (error) {
    //   setMessage("Could not upload the file!");
    //   console.error(error);
    // }
  };

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: type === "Resume" ? "application/pdf" : "image/*", // Accept only relevant file types
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {type} Upload
      </Typography>

      {currentFile && (
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

      {fileInfos.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Uploaded Files
            </Typography>
            <List>
              {fileInfos.map((file, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View File
                      </a>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default DocumentUpload;
