import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import api from "../api/axios.js";

const ProjectForm = () => {
  const params = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ongoing",
    deliveryDate: "",
    followUpIntervalDays: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/clients/${params.id}/projects`, formData);
      alert("Project added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: 3, maxWidth: 600, width: "100%" }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add Project
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Project Title */}
          <TextField
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          {/* Project Description */}
          <TextField
            label="Project Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />

          {/* Status */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              label="Status"
            >
              <MenuItem value="ongoing">Ongoing</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
            </Select>
          </FormControl>

          {/* Delivery Date */}
          <TextField
            label="Delivery Date"
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {/* Follow-up Interval */}
          <TextField
            label="Follow-up Interval (days)"
            type="number"
            name="followUpIntervalDays"
            value={formData.followUpIntervalDays}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            inputProps={{ min: 0 }}
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: 3, borderRadius: 2 }}
            fullWidth
          >
            Add Project
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProjectForm;
