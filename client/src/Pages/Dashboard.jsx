/* eslint-disable no-unused-vars */
// import React from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import ClientList from '../Components/ClientList';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
// import {useState} from 'react'
import ClientForm from '../Components/ClientForm';
import { useSelector,useDispatch } from 'react-redux';
import { OpenModal,CloseModal } from '../redux/Slices/modalSlice';
import { setPage } from '../redux/Slices/paginationSlice';
import Pagination from '@mui/material/Pagination';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  }
];

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


function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        px: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};


const Dashboard = (props) => {
  const dispatch = useDispatch()
  const stateVal = useSelector((state)=>state.modal.ModalState)
  console.log(stateVal)

  const handleOpen = ()=>{
    if (stateVal === false) {
  dispatch(OpenModal());
} else {
  dispatch(CloseModal());
}
  }

  const PageValue = useSelector((state)=>state.pagination.value)
  // console.log(PageValue)

  const handleChange=(event,value)=>{
    dispatch(setPage(value))
  }

  return (
    <>
      <AppProvider
        navigation={NAVIGATION}
      >
        <DashboardLayout>
          <div className='p-4 flex justify-between'>
            <h1 className="text-2xl font-bold">Clients</h1>
            <Button onClick={handleOpen}>Add Client</Button>
          </div>
          <div className='p-4'>
            <ClientList/>
          </div>
          <div className='flex justify-center'>
            <Pagination count={5} onChange={handleChange}/>
          </div>
        </DashboardLayout>
      </AppProvider>


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
  );

  
}

export default Dashboard
