# PowerShell script to set up the Chelsea Tracker database
# Run this script from the project root directory

Write-Host "Setting up Chelsea Tracker Database..." -ForegroundColor Green

# Check if dotnet-ef is installed
Write-Host "Checking for Entity Framework tools..." -ForegroundColor Yellow
$efInstalled = dotnet tool list --global | Select-String "dotnet-ef"
if (-not $efInstalled) {
    Write-Host "Installing Entity Framework tools..." -ForegroundColor Yellow
    dotnet tool install --global dotnet-ef
}

# Build the solution
Write-Host "Building solution..." -ForegroundColor Yellow
dotnet build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Please fix any compilation errors first." -ForegroundColor Red
    exit 1
}

# Create migration
Write-Host "Creating database migration..." -ForegroundColor Yellow
dotnet ef migrations add InitialCreate --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API

if ($LASTEXITCODE -ne 0) {
    Write-Host "Migration creation failed. You may need to create the database manually." -ForegroundColor Red
    Write-Host "Please ensure SQL Server is running and accessible." -ForegroundColor Yellow
    exit 1
}

# Update database
Write-Host "Updating database..." -ForegroundColor Yellow
dotnet ef database update --project src/ChelseaTracker.Data --startup-project src/ChelseaTracker.API

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database setup completed successfully!" -ForegroundColor Green
    Write-Host "You can now run the application with: dotnet run --project src/ChelseaTracker.API" -ForegroundColor Cyan
} else {
    Write-Host "Database update failed. Please check your connection string and SQL Server setup." -ForegroundColor Red
}
