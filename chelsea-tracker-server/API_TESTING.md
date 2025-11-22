# API Testing Guide

This guide shows you how to test all the API endpoints that connect to JSON Server.

## Prerequisites

1. Start JSON Server:
   ```bash
   npm run json-server
   ```
   This runs on `http://localhost:3001`

2. Start the Express API server:
   ```bash
   npm start
   ```
   This runs on `http://localhost:4000`

## Testing with cURL

### Players Endpoints

#### Get All Players
```bash
curl http://localhost:4000/api/players
```

#### Get Player by ID
```bash
curl http://localhost:4000/api/players/1
```

#### Create New Player
```bash
curl -X POST http://localhost:4000/api/players \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Player",
    "position": "Forward",
    "number": 99,
    "nationality": "England",
    "age": 25,
    "height": "180 cm",
    "weight": "75 kg",
    "stats": {
      "goals": 0,
      "assists": 0,
      "appearances": 0,
      "yellowCards": 0,
      "redCards": 0
    },
    "bio": "New player bio"
  }'
```

#### Update Player
```bash
curl -X PUT http://localhost:4000/api/players/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name",
    "position": "Midfielder",
    "number": 20,
    "nationality": "England",
    "age": 22,
    "height": "185 cm",
    "weight": "70 kg",
    "stats": {
      "goals": 15,
      "assists": 10,
      "appearances": 30,
      "yellowCards": 3,
      "redCards": 0
    },
    "bio": "Updated bio"
  }'
```

#### Delete Player
```bash
curl -X DELETE http://localhost:4000/api/players/1
```

### Matches Endpoints

#### Get All Matches
```bash
curl http://localhost:4000/api/matches
```

#### Get Match by ID
```bash
curl http://localhost:4000/api/matches/1
```

#### Create New Match
```bash
curl -X POST http://localhost:4000/api/matches \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-10-01",
    "time": "15:00",
    "homeTeam": "Chelsea",
    "awayTeam": "Arsenal",
    "venue": "Stamford Bridge",
    "competition": "Premier League",
    "status": "scheduled",
    "score": null
  }'
```

### Leagues Endpoints

#### Get All Leagues
```bash
curl http://localhost:4000/api/leagues
```

#### Get League by ID
```bash
curl http://localhost:4000/api/leagues/1
```

### Staff Endpoints

#### Get All Staff
```bash
curl http://localhost:4000/api/staff
```

#### Get Staff by ID
```bash
curl http://localhost:4000/api/staff/1
```

### Stadiums Endpoints

#### Get All Stadiums
```bash
curl http://localhost:4000/api/stadiums
```

#### Get Stadium by ID
```bash
curl http://localhost:4000/api/stadiums/1
```

## Testing with Browser

You can also test GET requests directly in your browser:

- Health check: http://localhost:4000/api/health
- All players: http://localhost:4000/api/players
- All matches: http://localhost:4000/api/matches
- All leagues: http://localhost:4000/api/leagues
- All staff: http://localhost:4000/api/staff
- All stadiums: http://localhost:4000/api/stadiums

## Testing with Postman or Thunder Client

1. Import the following collection or create requests manually:

### Base URL
```
http://localhost:4000/api
```

### Available Endpoints

**Players:**
- GET `/players` - Get all players
- GET `/players/:id` - Get player by ID
- POST `/players` - Create player
- PUT `/players/:id` - Update player
- DELETE `/players/:id` - Delete player

**Matches:**
- GET `/matches` - Get all matches
- GET `/matches/:id` - Get match by ID
- POST `/matches` - Create match
- PUT `/matches/:id` - Update match
- DELETE `/matches/:id` - Delete match

**Leagues:**
- GET `/leagues` - Get all leagues
- GET `/leagues/:id` - Get league by ID
- POST `/leagues` - Create league
- PUT `/leagues/:id` - Update league
- DELETE `/leagues/:id` - Delete league

**Staff:**
- GET `/staff` - Get all staff
- GET `/staff/:id` - Get staff by ID
- POST `/staff` - Create staff member
- PUT `/staff/:id` - Update staff member
- DELETE `/staff/:id` - Delete staff member

**Stadiums:**
- GET `/stadiums` - Get all stadiums
- GET `/stadiums/:id` - Get stadium by ID
- POST `/stadiums` - Create stadium
- PUT `/stadiums/:id` - Update stadium
- DELETE `/stadiums/:id` - Delete stadium

## Direct JSON Server Access

You can also access JSON Server directly (bypassing the Express API):

- Players: http://localhost:3001/players
- Matches: http://localhost:3001/matches
- Leagues: http://localhost:3001/leagues
- Staff: http://localhost:3001/staff
- Stadiums: http://localhost:3001/stadiums

## Sample Data

The `db.json` file includes:
- **8 players** with detailed stats
- **6 matches** (5 scheduled, 1 completed)
- **3 leagues** (Premier League, FA Cup, EFL Cup)
- **3 staff members** (coaching staff)
- **3 stadiums** (Stamford Bridge, Wembley, Old Trafford)

