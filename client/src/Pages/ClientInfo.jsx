/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axios.js'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ClientForm from '../Components/ClientForm';
import { useSelector,useDispatch } from 'react-redux';
import { OpenModal,CloseModal } from '../redux/Slices/modalSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ClientInfo = () => {
    const [client, setSingleClient] = useState([])
    console.log(client)

    const params = useParams()

    const dispatch = useDispatch()
    const stateVal = useSelector((state)=>state.modal.ModalState)
    // console.log(stateVal)

    const handleOpen = ()=>{
    if (stateVal === false) {
  dispatch(OpenModal());
} else {
  dispatch(CloseModal());
}
  }

    useEffect(()=>{
        const fetchSingleClient = async()=>{
            try{
            const res = await api.get(`/clients/${params.id}`)
            setSingleClient(res.data)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
        }
        fetchSingleClient()
    }, [])  

  return (
    <>
    {/* <div>
        <div className="text-lg font-semibold">{client.name}</div>
        <div className="text-sm text-gray-600">{client.email}</div>
        <div className="text-sm">Follow-up in {client.followUpInterval} days</div>
        <div className="mt-2">
            <span className="text-sm font-medium">Projects:</span>
            <div>
                {client?.projects?.map(project=>{
                    console.log(project._id)
                    console.log(project.title)
                    return(
                        <>
                        <h1>{project.title}</h1>
                        <Link to={`/projects/edit/${project._id}?clientID=${client._id}`}>Edit Project</Link>
                        </>
                    )
                })}
            </div>
        </div>
        <div>
            <Link to={`/clients/edit/${client._id}`}>Update Profile</Link>
            <Link to={`/projects/new/${client._id}`}>Add Project</Link>
        </div>
    </div> */}

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: "80%",
          maxWidth: 900,
          borderRadius: 3,
          boxShadow: 5,
          p: 3,
        }}
      >
        {/* Header Section */}
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            sx={{ width: 80, height: 80, mr: 3 }}
            src="https://via.placeholder.com/80"
            alt={client.name}
          />
          <Box>
            <Typography variant="h5" fontWeight="bold">
              {client.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {client.company}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Client Info */}
        <CardContent sx={{ mb: 2 }}>
          <Typography variant="body1">
            <strong>Email:</strong> {client.email}
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> {client.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Address:</strong> {client.address}
          </Typography>
          <Button onClick={handleOpen}>Edit Profile</Button>
        </CardContent>

        <Divider sx={{ mb: 2 }} />

        {/* Projects Section */}
        <Box>
          <div className='flex justify-between'> 
            <Typography variant="h6" gutterBottom>
                Projects
            </Typography>
            <Link to={`/projects/new/${client._id}`}><Button>Add Project</Button></Link>
          </div> 
          {client?.projects?.length == 0 ? 
          
          <h1>No Projects</h1>

          :
          
          <Box
            sx={{
              maxHeight: 200,
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 1,
            }}
          >
            <List>
              {client?.projects?.map((project) => {
              return(
                <ListItem key={project.id} divider className='flex justify-between'>
                  
                  <ListItemText
                    primary={project.title}
                    secondary={`Status: ${project.status}`}
                  />
                  <Link to={`/projects/edit/${project._id}?clientID=${client._id}`}><Button>Edit Project</Button></Link>
                </ListItem>
              )})}
            </List>
          </Box>
          
          }
        </Box>
      </Card>
    </Box>

    <Modal
        open={stateVal}
        onClose={() => dispatch(CloseModal())} 
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{ backdrop: { sx: { backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0,0,0,0.2)' } } }}
      >
        <Box sx={style}>
          <ClientForm/>
        </Box>
      </Modal>

    </>
  )
}

export default ClientInfo
