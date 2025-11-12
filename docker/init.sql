-- Create database if not exists
CREATE DATABASE IF NOT EXISTS company_db;

-- Connect to the database
\c company_db;

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table (will be managed by TypeORM migrations)
-- This is just for reference, TypeORM will handle schema creation

-- Optional: Create indexes
-- CREATE INDEX idx_companies_email ON companies(email);
-- CREATE INDEX idx_companies_name ON companies(company_name);

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE company_db TO postgres;