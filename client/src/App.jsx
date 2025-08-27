import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './Pages/Dashboard.jsx'
// import ClientList from './Components/ClientList.jsx';
// import ClientForm from './Pages/ClientForm.jsx';
import ClientInfo from './Pages/ClientInfo.jsx'
import ProjectForm from './Pages/ProjectForm.jsx'
import ProjectEditForm from './Pages/ProjectEditForm.jsx'
import Homepage from './Pages/Homepage.jsx'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/clients/new" element={<ClientForm />} /> */}
        {/* <Route path="/clients/edit/:id" element={<ClientForm />} /> */}
        <Route path="/clients/info/:id" element={<ClientInfo/>} />
        <Route path="/projects/new/:id" element={<ProjectForm />} />
        <Route path="/projects/edit/:id" element={<ProjectEditForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
