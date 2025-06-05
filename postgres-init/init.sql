-- init.sql
-- Add CREATEDB privilege here
CREATE USER auth_user WITH PASSWORD 'auth_password' CREATEDB;
CREATE DATABASE auth_db;
GRANT ALL PRIVILEGES ON DATABASE auth_db TO auth_user;

-- Connect to the newly created database to grant schema permissions
\c auth_db;

-- Grant usage and create permissions on the public schema to auth_user
GRANT USAGE, CREATE ON SCHEMA public TO auth_user;
