import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientList from './Pages/ClientList.jsx';
import ClientForm from './Pages/ClientForm.jsx';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/new" element={<ClientForm />} />
        <Route path="/clients/edit/:id" element={<ClientForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
