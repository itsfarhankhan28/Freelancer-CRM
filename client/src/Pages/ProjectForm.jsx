import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios.js';

const ProjectForm = () => {
  const params = useParams();
  console.log(params.id)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'ongoing',
  });

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
      await api.post(`/clients/${params.id}/projects`, formData)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">Add Project</h2>
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

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
