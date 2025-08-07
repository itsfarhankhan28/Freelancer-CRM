import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const ClientForm = () => {
  const { id } = useParams(); // client ID for editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    followUpInterval: ''
  });

  // Fetch client data if in edit mode
  useEffect(() => {
    if (id) {
      api.get(`/clients/${id}`)
        .then(res => setFormData(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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
        await api.post('/clients', formData);
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">{id ? 'Edit Client' : 'Add Client'}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="p-2 border rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="p-2 border rounded" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="p-2 border rounded" />
        <input type="number" name="followUpInterval" value={formData.followUpInterval} onChange={handleChange} placeholder="Follow-up Interval (days)" className="p-2 border rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {id ? 'Update Client' : 'Add Client'}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
