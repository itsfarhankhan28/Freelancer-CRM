import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid
} from "@mui/material";
import api from "../api/axios";
import { useSelector } from "react-redux";

const ClientForm = () => {
  const { id } = useParams(); // client ID for editing
  const navigate = useNavigate();

  const {user_id} = useSelector((state)=>state.auth)

  const [formData, setFormData] = useState({
    owner:`${user_id}`,
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    followUpInterval: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch client data if in edit mode
  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/clients/${id}`)
        .then((res) => setFormData(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/clients/${id}`, formData);
      } else {
        await api.post("/clients", formData);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  if (loading) return <Typography>Loading client details...</Typography>;

  return (
    <Paper
      elevation={3}
      sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 4, borderRadius: 3}}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {id ? "Edit Client" : "Add Client"}
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Follow-up Interval (days)"
              name="followUpInterval"
              type="number"
              inputProps={{ min: 1 }}
              value={formData.followUpInterval}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.2 }}
        >
          {id ? "Update Client" : "Add Client"}
        </Button>
      </Box>
    </Paper>
  );
};

export default ClientForm;
