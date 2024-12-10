# PowerShell script for Windows setup
Write-Host "Starting MongoDB setup..." -ForegroundColor Green

# Stop and remove existing containers
docker-compose down -v

# Start the containers
docker-compose up -d

Write-Host "Waiting for MongoDB to initialize (30 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

# Initialize replica set
docker-compose exec mongodb mongosh --eval "rs.initiate({_id:'rs0',members:[{_id:0,host:'mongodb:27017'}]})"

Write-Host "Waiting for replica set to stabilize (10 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Generate Prisma client and push schema
Write-Host "Generating Prisma client and pushing schema..." -ForegroundColor Green
npx prisma generate
npx prisma db push

# Run seed script
Write-Host "Running seed script..." -ForegroundColor Green
npm run seed

Write-Host "Setup completed!" -ForegroundColor Green