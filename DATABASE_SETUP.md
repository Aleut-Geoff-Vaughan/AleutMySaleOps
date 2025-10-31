# Database Setup Guide

## Azure SQL Database Connection

This guide will help you configure the Azure SQL Database connection for mySalesOps.

## Prerequisites

- Access to Azure SQL Database: `af-enterprise.93c9b1fe5719.database.windows.net`
- Database name
- Database username and password
- Database should have the required tables (see schema below)

## Configuration Steps

### 1. Update Environment Variables

Edit the `.env` file in the root directory with your database credentials:

```env
# Azure SQL Database Configuration
DB_SERVER=af-enterprise.93c9b1fe5719.database.windows.net
DB_DATABASE=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_PORT=1433

# API Server Configuration
API_PORT=3002
```

**⚠️ Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

### 2. Required Database Schema

Your Azure SQL database should have the following tables:

#### Users Table
```sql
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    username NVARCHAR(50) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    role NVARCHAR(20) NOT NULL, -- 'admin', 'sales', 'viewer'
    isActive BIT DEFAULT 1,
    created_date DATETIME DEFAULT GETDATE(),
    last_modified DATETIME DEFAULT GETDATE()
);
```

#### Agencies Table
```sql
CREATE TABLE agencies (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(200) NOT NULL,
    agencyType NVARCHAR(100),
    address NVARCHAR(200),
    city NVARCHAR(100),
    state NVARCHAR(2),
    zip NVARCHAR(10),
    phone NVARCHAR(20),
    website NVARCHAR(200)
);
```

#### Contacts Table
```sql
CREATE TABLE contacts (
    id INT PRIMARY KEY IDENTITY(1,1),
    firstName NVARCHAR(50) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    title NVARCHAR(100),
    email NVARCHAR(100),
    phone NVARCHAR(20),
    agency_id INT,
    FOREIGN KEY (agency_id) REFERENCES agencies(id)
);
```

#### Opportunities Table
```sql
CREATE TABLE opportunities (
    id INT PRIMARY KEY IDENTITY(1,1),
    opportunity_name NVARCHAR(200) NOT NULL,
    agency_id INT,
    stage NVARCHAR(50) NOT NULL,
    value DECIMAL(18,2),
    probability INT,
    close_date DATE,
    description NVARCHAR(MAX),
    contact_id INT,
    created_date DATETIME DEFAULT GETDATE(),
    last_modified DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (agency_id) REFERENCES agencies(id),
    FOREIGN KEY (contact_id) REFERENCES contacts(id)
);
```

#### Entities Table
```sql
CREATE TABLE entities (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(200) NOT NULL,
    ein NVARCHAR(20) UNIQUE NOT NULL,
    state NVARCHAR(2),
    formationDate DATE,
    certifications NVARCHAR(MAX), -- JSON array stored as string
    sbaReportingDue DATE,
    documents NVARCHAR(MAX), -- JSON array stored as string
    notes NVARCHAR(MAX)
);
```

#### Forecasts Table
```sql
CREATE TABLE forecasts (
    id INT PRIMARY KEY IDENTITY(1,1),
    fiscalYear INT NOT NULL,
    groups NVARCHAR(MAX) NOT NULL, -- JSON array stored as string
    lastUpdated DATE,
    notes NVARCHAR(MAX)
);
```

### 3. Sample Data (Optional)

You can insert some sample data to test the connection:

```sql
-- Insert sample user
INSERT INTO users (username, password, firstName, lastName, email, role)
VALUES ('admin', 'admin123', 'Admin', 'User', 'admin@example.com', 'admin');

-- Insert sample agency
INSERT INTO agencies (name, agencyType, address, city, state, zip)
VALUES ('Department of Defense', 'Federal', '1000 Defense Pentagon', 'Washington', 'DC', '20301');
```

## Running the Application

### Start Both Servers (Recommended)

Run both the React app and API server concurrently:

```bash
npm run dev
```

This will start:
- React app on `http://localhost:3001`
- API server on `http://localhost:3002`

### Start Servers Separately

If you prefer to run them separately:

**Terminal 1 - React App:**
```bash
PORT=3001 npm start
```

**Terminal 2 - API Server:**
```bash
npm run server
```

## Testing the API

Once the server is running, you can test the API endpoints:

### Health Check
```bash
curl http://localhost:3002/api/health
```

### Get All Opportunities
```bash
curl http://localhost:3002/api/opportunities
```

### Get All Agencies
```bash
curl http://localhost:3002/api/agencies
```

## API Endpoints

### Opportunities
- `GET /api/opportunities` - Get all opportunities
- `GET /api/opportunities/:id` - Get single opportunity
- `POST /api/opportunities` - Create opportunity
- `PUT /api/opportunities/:id` - Update opportunity
- `DELETE /api/opportunities/:id` - Delete opportunity

### Agencies
- `GET /api/agencies` - Get all agencies with contacts
- `GET /api/agencies/:id` - Get single agency with contacts
- `POST /api/agencies` - Create agency
- `PUT /api/agencies/:id` - Update agency
- `DELETE /api/agencies/:id` - Delete agency

### Contacts
- `GET /api/contacts` - Get all contacts
- `GET /api/contacts/agency/:agencyId` - Get contacts by agency
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

### Entities
- `GET /api/entities` - Get all entities
- `GET /api/entities/:id` - Get single entity
- `POST /api/entities` - Create entity
- `PUT /api/entities/:id` - Update entity
- `DELETE /api/entities/:id` - Delete entity

### Forecasts
- `GET /api/forecasts` - Get all forecasts
- `GET /api/forecasts/:id` - Get single forecast
- `POST /api/forecasts` - Create forecast
- `PUT /api/forecasts/:id` - Update forecast
- `DELETE /api/forecasts/:id` - Delete forecast

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users/login` - Login
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user

## Troubleshooting

### Connection Issues

1. **Firewall Rules**: Ensure your IP address is allowed in Azure SQL firewall rules
2. **Credentials**: Double-check username and password in `.env`
3. **Database Name**: Verify the database name is correct
4. **SSL/TLS**: Azure SQL requires encrypted connections (already configured)

### Common Errors

**Error: "Login failed for user"**
- Check username and password in `.env`
- Verify user has access to the database

**Error: "Cannot open server"**
- Check firewall rules in Azure Portal
- Verify server name is correct

**Error: "ECONNREFUSED"**
- Check if API server is running
- Verify API_PORT in `.env` (default: 3002)

## Security Notes

⚠️ **Important Security Considerations:**

1. **Password Hashing**: The current implementation stores passwords in plain text. For production, implement bcrypt password hashing.

2. **Environment Variables**: Never commit `.env` to version control.

3. **SQL Injection**: The API uses parameterized queries to prevent SQL injection.

4. **Authentication**: Consider implementing JWT tokens for API authentication.

5. **HTTPS**: Use HTTPS in production environments.

## Next Steps

After setting up the database connection:

1. Update React app contexts to fetch from API instead of using mock data
2. Implement authentication with JWT tokens
3. Add password hashing with bcrypt
4. Set up proper error handling and logging
5. Configure production environment variables

## Support

For issues or questions, contact the development team or refer to:
- [Azure SQL Documentation](https://docs.microsoft.com/en-us/azure/sql-database/)
- [Node.js mssql Package](https://www.npmjs.com/package/mssql)
