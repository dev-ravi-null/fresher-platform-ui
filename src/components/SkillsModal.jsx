import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "SQL",
  "HTML",
  "CSS",
  "TypeScript",
  "Redux",
  "Docker",
  "Kubernetes",
  "Git",
  "GraphQL",
];

const SkillsModal = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleSubmit = () => {
    alert(`Selected Skills: ${selectedSkills.join(", ")}`);
    setSelectedSkills([]); // Reset the skills after submission
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "10vh",
        px: 2,
        py: 4,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
        maxWidth: 700,
        mx: "auto",
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Select Your Skills
      </Typography>
      <Autocomplete
        multiple
        options={skillsList}
        getOptionLabel={(option) => option}
        value={selectedSkills}
        onChange={(event, newValue) => setSelectedSkills(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Select Skills"
            placeholder="Choose..."
          />
        )}
        sx={{ width: "100%", mb: 3 }}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SkillsModal;