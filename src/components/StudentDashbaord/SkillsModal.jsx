import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

import { updateSkillsModal } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate


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
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function

  const fresherDetails = useSelector((state) => state.fresherDetails.data.data).fresherDetails;
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selfProjects, setSelfProjects] = useState([{ liveLink: "", githubLink: "", summary: "" }]);
  const [loading, setLoading] = useState(false); // Add loading state


  useEffect(() => {
    if (fresherDetails) {
      const fetchedData = fresherDetails
      debugger
      setSelectedSkills(fetchedData.skills || []);
      debugger
      if (fetchedData.selfProject && fetchedData.selfProject.length > 0) {
        setSelfProjects(fetchedData.selfProject.map(project => ({
          liveLink: project.liveLink || "",
          githubLink: project.githubLink || "",
          summary: project.summary || ""
        })));
      } else {
        setSelfProjects([{ liveLink: "", githubLink: "", summary: "" }]);
      }
    }
  }, [fresherDetails]);

  const handleAddProject = () => {
    setSelfProjects([...selfProjects, { liveLink: "", githubLink: "", summary: "" }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = selfProjects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setSelfProjects(updatedProjects);
  };

  const handleSubmit = () => {
    const incompleteProjects = selfProjects.some(
      (project) => !project.liveLink || !project.githubLink || !project.summary
    );

    if (incompleteProjects) {
      alert("Please fill in all fields for each project.");
      return;
    }
    setLoading(true); // Set loading to true when the form is being submitted


    const dataToSend = {
      userId: localStorage.getItem("userId"),
      skills: selectedSkills,
      selfProject: selfProjects,
    };

    updateSkillsModal(dataToSend, dispatch);

    // Reset form only if the update was successful (you might want to check the response from updateSkillsModal)
    // For this example, I am resetting immediately.  You should add proper success handling.
    // setSelectedSkills([]);
    // setSelfProjects([{ liveLink: "", githubLink: "", summary: "" }]);
    // setTimeout(() => location.reload());
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        px: 3,
        py: 5,
        maxWidth: 800,
        mx: "auto",
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* ... (rest of your JSX -  the same as before) */}
      <Typography variant="h5" component="h2" sx={{ textAlign: "center", mb: 4 }}>
        Add Skills & Self Projects
      </Typography>

      {/* Skills Section */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          Skills
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
          sx={{ mb: 3 }}
        />
      </Box>

      {/* Self Projects Section */}
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
          Self Projects
        </Typography>
        {selfProjects.map((project, index) => (
          <Box key={index} sx={{ mb: 3, border: "1px solid #ddd", p: 2, borderRadius: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Project {index + 1}
            </Typography>
            <TextField
              variant="outlined"
              label="Live Link"
              fullWidth
              value={project.liveLink}
              onChange={(e) => handleProjectChange(index, "liveLink", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              label="GitHub Link"
              fullWidth
              value={project.githubLink}
              onChange={(e) => handleProjectChange(index, "githubLink", e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              variant="outlined"
              label="Summary"
              multiline
              rows={3}
              fullWidth
              value={project.summary}
              onChange={(e) => handleProjectChange(index, "summary", e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        ))}
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleAddProject}
          sx={{ mb: 3 }}
        >
          Add More Self Projects
        </Button>
      </Box>

      {/* Submit Button */}
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={loading} >
      {loading ? (
          <CircularProgress size={24} sx={{ color: "white" }} /> // Show spinner when loading
        ) : (
          "Submit"
        )}
      </Button>
    </Box>
  );
};

export default SkillsAndProjects;