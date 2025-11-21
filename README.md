# Chelsea Tracker 

## Vision
Chelsea Tracker is a web application designed to provide fans with **everything they need to know about Chelsea Football Club**.  
The goal is to create a clean, easy-to-navigate platform that displays stats, schedules, player bios, and more — helping fans keep track of their favorite club.

---

## Tech Stack
- **Frontend:** Angular  
- **Backend:** Node.js (Express)  
- **Database:** JSON Server  

---

## Features & Goals
- View **all Chelsea squad members** and their statistics  
- Compare stats between Chelsea players and players from other teams  
- Create **graphs and diagrams** to visualize player performance  
- Display **player and staff profiles** with photos and biographical info  
- Show a **map of stadiums** where Chelsea will play  
- View the **Chelsea match schedule**  
- Home page with **team rankings, stat leaders, and league comparisons**  

---

## Team Members

**Alex Ednie**  
 edniea@rpi.edu   

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chelsea-tracker.git
   cd chelseatracker
   ```

2. Install frontend dependencies:
   ```bash
   cd chelsea-tracker
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../chelsea-tracker-server
   npm install
   ```

### Running the Application

1. Start JSON Server (in `chelsea-tracker-server` directory):
   ```bash
   npm run json-server
   ```
   This will start JSON Server on `http://localhost:3001`

2. Start the Express backend server (in `chelsea-tracker-server` directory):
   ```bash
   npm start
   ```
   This will start the API server on `http://localhost:4000`

3. Start the Angular frontend (in `chelsea-tracker` directory):
   ```bash
   npm start
   ```
   This will start the development server on `http://localhost:4200`

### Development Mode

To run both the Express server and JSON Server together:
```bash
cd chelsea-tracker-server
npm run dev:all
```
