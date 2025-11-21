import axios from "axios";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

export async function getChelseaPlayers(req, res) {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/players`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ 
      error: err.message,
      message: "Make sure JSON Server is running on port 3001"
    });
  }
}

export async function getPlayerById(req, res) {
  try {
    const { id } = req.params;
    const response = await axios.get(`${JSON_SERVER_URL}/players/${id}`);
    res.json(response.data);
  } catch (err) {
    if (err.response?.status === 404) {
      res.status(404).json({ error: "Player not found" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}

export async function createPlayer(req, res) {
  try {
    const response = await axios.post(`${JSON_SERVER_URL}/players`, req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updatePlayer(req, res) {
  try {
    const { id } = req.params;
    const response = await axios.put(`${JSON_SERVER_URL}/players/${id}`, req.body);
    res.json(response.data);
  } catch (err) {
    if (err.response?.status === 404) {
      res.status(404).json({ error: "Player not found" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}

export async function deletePlayer(req, res) {
  try {
    const { id } = req.params;
    await axios.delete(`${JSON_SERVER_URL}/players/${id}`);
    res.status(204).send();
  } catch (err) {
    if (err.response?.status === 404) {
      res.status(404).json({ error: "Player not found" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
}
