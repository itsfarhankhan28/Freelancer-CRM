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
import { useSelector } from 'react-redux';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  // const navigate = useNavigate()

  const PageValue = useSelector((state)=>state.pagination.value)
  console.log(PageValue)

  const limit = 5

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get(`/clients?page=${PageValue}&limit=${limit}`);
        setClients(res.data.clients);
        console.log(res.data.clients)
      } catch (err) {
        console.error(err);
      }
    };
    fetchClients();
  }, [PageValue]);

  const ProfileCard = ({ _id, name, email }) => {
  return (
    <Card sx={{ width: 250, borderRadius: 3, boxShadow: 3 }}>
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
    <div>
      {clients?.length == 0 ? 
    
    <h1>No Clients</h1>

    :

        <Grid container spacing={3}>
        {clients?.map((client) => {
          return(
          <>
          <div className='flex flex-wrap'>
            <ProfileCard {...client} />
          </div>
          </>
        )})}
        </Grid>
    
    }
    </div>
  );
};

export default ClientList;
