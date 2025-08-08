import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  // const navigate = useNavigate()

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
          <>
          <Link to={`/clients/info/${client._id}`}>
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
          </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default ClientList;
