/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

// MUI imports
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from '@mui/material';

const ProjectEditForm = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const clientID = searchParams.get('clientID');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'ongoing',
    deliveryDate: '',
    followUpIntervalDays: 0,
  });

  const [clients, setClients] = useState([]);

  // Fetch all clients
  useEffect(() => {
    api.get('/clients')
      .then((res) => setClients(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch project data if editing
  useEffect(() => {
    if (id && clientID) {
      api.get(`/clients/${clientID}/projects/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error(err));
    }
  }, [id, clientID]);

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
      await api.put(`/clients/${clientID}/projects/${id}`, formData);
      alert('Project updated successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ bgcolor: '#f9fafb' }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          width: '100%',
          bgcolor: 'white',
          p: 4,
          borderRadius: 3,
          boxShadow: 3,
          display: 'grid',
          gap: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Edit Project
        </Typography>

        {/* Title */}
        <TextField
          label="Project Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <TextField
          label="Project Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />

        {/* Status */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            label="Status"
          >
            <MenuItem value="ongoing">Ongoing</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="under maintenance">Under Maintenance</MenuItem>
          </Select>
        </FormControl>

        {/* Delivery Date */}
        <TextField
          label="Delivery Date"
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate ? formData.deliveryDate.split('T')[0] : ''}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />

        {/* Follow-up Interval */}
        <TextField
          label="Follow-up Interval (days)"
          type="number"
          name="followUpIntervalDays"
          value={formData.followUpIntervalDays}
          onChange={handleChange}
          inputProps={{ min: 0 }}
          required
        />

        {/* Submit */}
        <Button type="submit" variant="contained" color="success" fullWidth>
          Update Project
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectEditForm;
