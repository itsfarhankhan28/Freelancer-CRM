import { useEffect, useState } from 'react';
import api from '../api/axios.js';
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Grid
} from "@mui/material";

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

  const ProfileCard = ({ _id, name, email }) => {
  return (
    <Card sx={{ maxWidth: 280, borderRadius: 3, boxShadow: 3 }}>
      <CardHeader
        avatar={<Avatar sx={{ width: 56, height: 56 }} />}
        title={
          <Typography variant="h6" fontWeight="bold">
            {name}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/clients/info/${_id}`}><Button size="small" variant="contained" fullWidth>
          View More
        </Button></Link>
      </CardActions>
    </Card>
  );
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <Grid container spacing={3}>
        {clients.map(client => (
          <>
          {/* <Link to={`/clients/info/${client._id}`}>
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
          </Link> */}
          <Grid item xs={12} sm={6} md={4}>
            <ProfileCard {...client} />
          </Grid>
          </>
        ))}
        </Grid>
    </div>
  );
};

export default ClientList;
