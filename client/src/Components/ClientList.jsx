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
import Loader from './Loader.jsx'

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setisLoading] = useState(true)
  // const navigate = useNavigate()

  const PageValue = useSelector((state)=>state.pagination.value)
  console.log(PageValue)
  const {token} = useSelector((state)=>state.auth)

  const limit = 5

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setisLoading(true)
        const res = await api.get(`/clients?page=${PageValue}&limit=${limit}`, {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        });
        setClients(res.data.clients);
        console.log(res.data.clients)
      } catch (err) {
        console.error(err);
      } finally{
        setisLoading(false)
      }
    };
    fetchClients();
  }, [PageValue]);

  
  if(isLoading == true){
    return(
      <>
      <Loader/>
      </>
    )
  }

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
