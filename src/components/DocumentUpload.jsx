import React, { useState } from 'react';
import { Box, Button, LinearProgress, Typography, Card, CardContent, List, ListItem, ListItemText, Alert } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [fileInfos, setFileInfos] = useState([]);

  const upload = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage('No file selected for upload!');
      return;
    }

    const file = selectedFiles[0];

    setProgress(0);
    setCurrentFile(file);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setMessage('File uploaded successfully!');
          setFileInfos((prevInfos) => [...prevInfos, { name: file.name, url: '#' }]);
          setCurrentFile(undefined);
          return prev;
        }
        return prev + 10;
      });
    }, 200);
  };

  const onDrop = (files) => {
    if (files.length > 0) {
      setSelectedFiles(files);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Photo Upload
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
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: '20px'
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
        <Alert severity={message.includes('successfully') ? 'success' : 'error'} sx={{ mb: 3 }}>
          {message}
        </Alert>
      )}

      {fileInfos.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              List of Files
            </Typography>
            <List>
              {fileInfos.map((file, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={file.name}
                    secondary={
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        {file.url}
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
