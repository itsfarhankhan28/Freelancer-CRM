/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axios.js'
// import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ClientInfo = () => {
    const [client, setSingleClient] = useState([])

    const params = useParams()

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
    <div>
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
    </div>
    </>
  )
}

export default ClientInfo
