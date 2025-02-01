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

const SkillsAndProjects = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsError, setSkillsError] = useState("");
  const [selfProjects, setSelfProjects] = useState([
    { liveLink: "", githubLink: "", summary: "", errors: {} },
  ]);

  const isValidURL = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "localhost|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" +
        "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" +
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return urlPattern.test(url);
  };

  const handleAddProject = () => {
    setSelfProjects([...selfProjects, { liveLink: "", githubLink: "", summary: "", errors: {} }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = selfProjects.map((project, i) =>
      i === index ? { ...project, [field]: value, errors: { ...project.errors, [field]: "" } } : project
    );
    setSelfProjects(updatedProjects);
  };

  const handleSubmit = () => {
    let hasErrors = false;
    setSkillsError("");

    if (selectedSkills.length === 0) {
      setSkillsError("At least one skill is required.");
      hasErrors = true;
    }

    const updatedProjects = selfProjects.map((project) => {
      const errors = {};

      if (!project.liveLink || !isValidURL(project.liveLink)) {
        errors.liveLink = "Enter a valid Live Link URL.";
        hasErrors = true;
      }
      if (!project.githubLink || !isValidURL(project.githubLink)) {
        errors.githubLink = "Enter a valid GitHub Link URL.";
        hasErrors = true;
      }
      if (!project.summary.trim()) {
        errors.summary = "Summary is required.";
        hasErrors = true;
      }

      return { ...project, errors };
    });

    setSelfProjects(updatedProjects);

    if (hasErrors) return;

    alert("Submitted Successfully!");
    setSelectedSkills([]);
    setSelfProjects([{ liveLink: "", githubLink: "", summary: "", errors: {} }]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, px: 3, py: 5, maxWidth: 800, mx: "auto", bgcolor: "background.paper", boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" sx={{ textAlign: "center", mb: 4 }}>
        Add Skills & Self Projects
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>Skills</Typography>
        <Autocomplete multiple options={skillsList} getOptionLabel={(option) => option} value={selectedSkills} onChange={(event, newValue) => {
          setSelectedSkills(newValue);
          setSkillsError("");
        }} renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Select Skills" placeholder="Choose..." error={!!skillsError} helperText={skillsError} />
        )} sx={{ mb: 3 }} />
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>Self Projects</Typography>
        {selfProjects.map((project, index) => (
          <Box key={index} sx={{ mb: 3, border: "1px solid #ddd", p: 2, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>Project {index + 1}</Typography>
            <TextField variant="outlined" label="Live Link" fullWidth value={project.liveLink} onChange={(e) => handleProjectChange(index, "liveLink", e.target.value)} sx={{ mb: 2 }} error={!!project.errors.liveLink} helperText={project.errors.liveLink} />
            <TextField variant="outlined" label="GitHub Link" fullWidth value={project.githubLink} onChange={(e) => handleProjectChange(index, "githubLink", e.target.value)} sx={{ mb: 2 }} error={!!project.errors.githubLink} helperText={project.errors.githubLink} />
            <TextField variant="outlined" label="Summary" multiline rows={3} fullWidth value={project.summary} onChange={(e) => handleProjectChange(index, "summary", e.target.value)} sx={{ mb: 2 }} error={!!project.errors.summary} helperText={project.errors.summary} />
          </Box>
        ))}
        <Button variant="outlined" color="secondary" onClick={handleAddProject} sx={{ mb: 3 }}>Add More Self Projects</Button>
      </Box>

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default SkillsAndProjects;
