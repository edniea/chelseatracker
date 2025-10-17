# Chelsea Tracker

A .NET 9 Web API application for tracking Chelsea FC players and matches using SQL Server and Entity Framework Core.

## Project Structure

```
ChelseaTracker/
├── src/
│   ├── ChelseaTracker.API/          # Web API project
│   ├── ChelseaTracker.Business/      # Business logic layer
│   ├── ChelseaTracker.Core/          # Core models and DTOs
│   └── ChelseaTracker.Data/          # Data access layer with EF Core
├── ChelseaTracker.sln               # Solution file
└── README.md
```

## Architecture

This project follows a clean architecture pattern with the following layers:

- **API Layer** (`ChelseaTracker.API`): Controllers, configuration, and API endpoints
- **Business Layer** (`ChelseaTracker.Business`): Business logic and services
- **Core Layer** (`ChelseaTracker.Core`): Domain models and DTOs
- **Data Layer** (`ChelseaTracker.Data`): Entity Framework DbContext and repositories

## Prerequisites

- .NET 9 SDK
- SQL Server (LocalDB, SQL Server Express, or SQL Server)
- Visual Studio 2022 or VS Code

## Setup Instructions

### 1. Clone and Build

```bash
git clone <repository-url>
cd chelseatracker
dotnet restore
dotnet build
```

### 2. Database Setup

#### Option A: Using Entity Framework Migrations (Recommended)

```bash
# Install EF Core tools globally (if not already installed)
dotnet tool install --global dotnet-ef

# Create and apply migrations
dotnet ef migrations add InitialCreate --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API
dotnet ef database update --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API
```

#### Option B: Manual Database Creation

1. Create a database named `ChelseaTrackerDb` in SQL Server
2. Update the connection string in `appsettings.json` if needed

### 3. Run the Application

```bash
dotnet run --project src/ChelseaTracker.API
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `https://localhost:5001/swagger`

## API Endpoints

### Players
- `GET /api/players` - Get all players
- `GET /api/players/{id}` - Get player by ID
- `POST /api/players` - Create new player
- `PUT /api/players/{id}` - Update player
- `DELETE /api/players/{id}` - Delete player (soft delete)

## Database Schema

### Players Table
- Id (Primary Key)
- FirstName, LastName (Required)
- Position, JerseyNumber, DateOfBirth, Nationality (Optional)
- CreatedAt, UpdatedAt (Timestamps)
- IsActive (Soft delete flag)

### Matches Table
- Id (Primary Key)
- Opponent (Required)
- MatchDate, Competition, Venue (Optional)
- ChelseaScore, OpponentScore, Result (Optional)
- CreatedAt, UpdatedAt (Timestamps)
- IsActive (Soft delete flag)

### PlayerMatches Table (Junction)
- Id (Primary Key)
- PlayerId, MatchId (Foreign Keys)
- Started, MinutesPlayed, Goals, Assists, YellowCards, RedCards

## Configuration

Connection strings are configured in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=ChelseaTrackerDb;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

## Development

### Adding New Features

1. **Models**: Add domain models in `ChelseaTracker.Core/Models`
2. **DTOs**: Add data transfer objects in `ChelseaTracker.Core/DTOs`
3. **Repositories**: Add data access in `ChelseaTracker.Data/Repositories`
4. **Services**: Add business logic in `ChelseaTracker.Business/Services`
5. **Controllers**: Add API endpoints in `ChelseaTracker.API/Controllers`

### Database Migrations

```bash
# Add new migration
dotnet ef migrations add <MigrationName> --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API

# Update database
dotnet ef database update --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API

# Remove last migration
dotnet ef migrations remove --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API
```

## Testing

```bash
# Run tests (when test projects are added)
dotnet test
```

## Deployment

The application can be deployed to:
- Azure App Service
- IIS
- Docker containers
- Any platform supporting .NET 9

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.