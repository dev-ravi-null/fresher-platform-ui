import React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const FresherCard = ({ fresher }) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={fresher.image}
        alt={`${fresher.name}'s profile`}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {fresher.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Commits: {fresher.commits}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interview Progress: {fresher.interviews}%
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
          {fresher.skills.map((skill, index) => (
            <Chip key={index} label={skill} size="small" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

FresherCard.propTypes = {
  fresher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    commits: PropTypes.number.isRequired,
    interviews: PropTypes.number.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default FresherCard;
