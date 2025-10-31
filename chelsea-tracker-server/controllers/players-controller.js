import axios from "axios";

const BASE_URL = "https://v3.football.api-sports.io";
const CHELSEA_TEAM_ID = 49;
const SEASON = 2023;

export async function getChelseaPlayers(req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/players`, {
      headers: { "x-apisports-key": process.env.API_FOOTBALL_KEY },
      params: { team: CHELSEA_TEAM_ID, season: SEASON },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
