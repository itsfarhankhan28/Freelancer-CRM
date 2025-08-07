import { useEffect, useState } from 'react';
import api from '../api/axios.js';

const ClientList = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/clients');
        setClients(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <div className="grid gap-4">
        {clients.map(client => (
          <div key={client._id} className="bg-white rounded-2xl p-4 shadow">
            <div className="text-lg font-semibold">{client.name}</div>
            <div className="text-sm text-gray-600">{client.email}</div>
            <div className="text-sm">Follow-up in {client.followUpInterval} days</div>
            <div className="mt-2">
              <span className="text-sm font-medium">Projects:</span>
              <ul className="list-disc ml-5">
                {client.projects.map(p => (
                  <li key={p._id}>{p.title} — {p.status}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
