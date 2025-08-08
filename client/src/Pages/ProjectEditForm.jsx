/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import api from '../api/axios';

const ProjectEditForm = () => {
  const { id } = useParams();
  console.log(id)
  
   const [searchParams, setSearchParams] = useSearchParams();
   const Url = searchParams.get('clientID')
   console.log(Url)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'ongoing',
  });

  const [clients, setClients] = useState([]);
//   console.log(clients)
//   Fetch all clients for dropdown

//   const ClientID;

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
    console.log(clients._id)
    e.preventDefault();
    try {
        await api.put(`/clients/${Url}/projects/${id}`, formData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="p-2 border rounded"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="ongoing">ongoing</option>
          <option value="delivered">delivered</option>
          <option value="under maintenance">under maintenance</option>
        </select>

        {/* <select
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Client</option>
          {clients.map(client => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select> */}

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
