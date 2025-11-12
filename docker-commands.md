# Start all services
docker-compose up -d

# Start only PostgreSQL
docker-compose up -d postgres

# View logs
docker-compose logs -f

# View PostgreSQL logs only
docker-compose logs -f postgres

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data)
docker-compose down -v

# Restart a specific service
docker-compose restart postgres

# Execute SQL in PostgreSQL
docker-compose exec postgres psql -U postgres -d company_db

# Access PostgreSQL shell
docker-compose exec postgres psql -U postgres

# Check service status
docker-compose ps

# View resource usage
docker stats

# Rebuild and restart API
docker-compose up -d --build api