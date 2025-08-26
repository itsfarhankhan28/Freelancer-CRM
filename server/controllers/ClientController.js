import Client from '../models/Clients.js';
import axios from 'axios';

// Create a new client
export const createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all clients ?page=1&limit=10
export const getAllClients = async (req, res) => {
  try {

    //pagination
    let {page,limit} = req.query

    page = parseInt(page)
    limit = parseInt(limit)

    const skip = (page - 1) * limit;

    const totalClient = await Client.countDocuments();

    const clients = await Client.find({ owner: req.user.id })
    .skip(skip)
    .limit(limit);


    res.json({
      totalClient,
      page,
      pages: Math.ceil(totalClient / limit),
      clients});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single client by ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a client
export const updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a client
export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add project to client
export const addProjectToClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    client.projects.push(req.body);
    await client.save();

    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single project by projectId for a specific client
export const getClientProjectById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const project = client.projects.id(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update a project
export const updateClientProject = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const project = client.projects.id(req.params.projectId);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    Object.assign(project, req.body);
    await client.save();

    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a project
export const deleteClientProject = async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const deleteproject = client.projects.id(req.params.projectId);
    deleteproject.remove
    await client.save();

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get projects due for follow-up
export const getDueFollowUps = async (req, res) => {
  try {
    const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date();
endOfToday.setHours(23, 59, 59, 999);

const clients = await Client.find({
  "projects.nextFollowUpDate": { $gte: startOfToday, $lte: endOfToday }
});

    // Flatten results to just the projects that are due
    const dueProjects = [];

    clients.forEach(client => {
      client.projects.forEach(project => {
        if (
  project.nextFollowUpDate &&
  project.nextFollowUpDate >= startOfToday &&
  project.nextFollowUpDate <= endOfToday
) {
  dueProjects.push({
    clientId: client._id,
    clientName: client.name,
    clientEmail: client.email,
    projectId: project._id,
    title: project.title,
    nextFollowUpDate: project.nextFollowUpDate
  });
}
      });
    });

    if (dueProjects.length > 0) {
      await axios.post("https://n8n-deployment-v029.onrender.com/webhook/follow-up", {
        dueProjects
      });
    }  

    res.json(dueProjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
