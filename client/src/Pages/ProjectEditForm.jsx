/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

const ProjectEditForm = () => {
  const { id } = useParams();
  console.log(id);

  const [searchParams, setSearchParams] = useSearchParams();
  const Url = searchParams.get('clientID');
  console.log(Url);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'ongoing',
    deliveryDate: '',
    followUpIntervalDays: 0
  });

  const [clients, setClients] = useState([]);

  useEffect(() => {
    api.get('/clients')
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);

  // Fetch project if in edit mode
  useEffect(() => {
    if (id) {
      api.get(`/clients/${Url}/projects/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clients/${Url}/projects/${id}`, formData);
      alert("Project updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">

        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="p-2 border rounded"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="p-2 border rounded"
        />

        {/* Status */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="ongoing">Ongoing</option>
          <option value="delivered">Delivered</option>
          <option value="under maintenance">Under Maintenance</option>
        </select>

        {/* Delivery Date */}
        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate ? formData.deliveryDate.split('T')[0] : ''}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />

        {/* Follow-up Interval in Days */}
        <input
          type="number"
          name="followUpIntervalDays"
          value={formData.followUpIntervalDays}
          onChange={handleChange}
          placeholder="Follow-up Interval (days)"
          className="p-2 border rounded"
          min="0"
          required
        />

        {/* Submit */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Update Project
        </button>
      </form>
    </div>
  );
};

export default ProjectEditForm;
