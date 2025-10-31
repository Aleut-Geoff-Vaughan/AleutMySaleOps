# mySalesOps - Business Management System

A comprehensive business management system for government contracting and business development teams, featuring opportunity tracking, entity management, sales forecasting, and Power BI reporting integration.

## 🚀 Features

### Sales Management
- **Opportunities**: Full pipeline tracking with 50+ fields
- **Agencies**: Government organization management
- **Contacts**: Key relationship tracking
- **Hierarchical Data**: Parent-child agency relationships

### Entity Management
- **LLC Tracking**: Complete entity information
- **SBA Reporting**: Automated reporting date tracking with alerts
- **Document Management**: Secure document storage per entity
- **Revenue Analytics**: Performance metrics by entity

### Sales Targets & Forecasting
- **Configurable Groups**: Custom forecast groupings
- **Target vs Actual**: Real-time performance tracking
- **Pipeline Management**: Weighted pipeline calculations
- **Multi-dimensional Analysis**: By division, market, or custom groups

### Reporting
- **Power BI Integration**: Embedded dashboard framework
- **Real-time Analytics**: Live performance metrics
- **Custom Reports**: Flexible reporting structure

### Configuration & Administration
- **Role-Based Access**: Admin, Sales, and Viewer roles
- **Customizable Dropdowns**: Stages, agency types, capabilities
- **User Management**: Complete user administration
- **Audit Trail**: Activity tracking

## 📋 Prerequisites

- Node.js 16+ and npm
- SQL Server 2019+ or Azure SQL Database
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mysalesops.git
cd mysalesops
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Backend Setup

```bash
cd ../backend
npm install
```

### 4. Database Setup

Run the SQL scripts in order:

```bash
# Connect to your SQL Server instance
sqlcmd -S your-server -d your-database -i database/01-create-tables.sql
sqlcmd -S your-server -d your-database -i database/02-seed-data.sql
```

Or use SQL Server Management Studio to execute the scripts.

### 5. Environment Configuration

**Backend** - Create `backend/.env`:

```env
PORT=5000
DB_SERVER=your-server.database.windows.net
DB_NAME=mysalesops
DB_USER=your-username
DB_PASSWORD=your-password
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Frontend** - Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Access the application at `http://localhost:3000`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with your preferred web server
```

## 🔐 Default Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | admin123 | Admin |
| sales | sales123 | Sales |
| viewer | viewer123 | Viewer |

**⚠️ IMPORTANT**: Change these passwords immediately in production!

## 📁 Project Structure

```
mysalesops/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Opportunities/
│   │   │   ├── Entities/
│   │   │   ├── Forecasts/
│   │   │   ├── Reporting/
│   │   │   └── Configuration/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── database/
│   ├── 01-create-tables.sql
│   ├── 02-seed-data.sql
│   └── README.md
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
└── README.md
```

## 🗄️ Database Schema

### Core Tables

- **Opportunities**: Main sales opportunity tracking
- **Agencies**: Government organizations
- **Contacts**: Key personnel
- **Entities**: LLCs and business entities
- **Forecasts**: Sales targets and actuals
- **Users**: System users and authentication
- **Stages**: Configurable sales stages
- **Capabilities**: Service offerings and revenue mix
- **Configuration**: System settings

See [DATABASE.md](docs/DATABASE.md) for complete schema.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### Opportunities
- `GET /api/opportunities` - List all opportunities
- `GET /api/opportunities/:id` - Get single opportunity
- `POST /api/opportunities` - Create opportunity
- `PUT /api/opportunities/:id` - Update opportunity
- `DELETE /api/opportunities/:id` - Delete opportunity

### Entities
- `GET /api/entities` - List all entities
- `POST /api/entities` - Create entity
- `PUT /api/entities/:id` - Update entity
- `DELETE /api/entities/:id` - Delete entity

See [API.md](docs/API.md) for complete API documentation.

## 🚢 Deployment

### Azure Deployment

**Frontend** (Azure Static Web Apps):
```bash
cd frontend
npm run build
# Deploy build folder to Azure Static Web Apps
```

**Backend** (Azure App Service):
```bash
cd backend
# Deploy to Azure App Service
```

**Database** (Azure SQL):
- Create Azure SQL Database
- Run migration scripts
- Update connection strings

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

### Alternative Deployment Options

- **Vercel** (Frontend)
- **Heroku** (Full Stack)
- **AWS** (EC2 + RDS)
- **Docker** (Containerized deployment)

## 🔒 Security Considerations

### Production Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Enable SQL injection protection
- [ ] Set up rate limiting
- [ ] Configure Content Security Policy
- [ ] Enable database encryption at rest
- [ ] Set up backup and recovery
- [ ] Configure monitoring and alerts

### Environment Variables

Never commit sensitive information. Use environment variables for:
- Database credentials
- API keys
- JWT secrets
- Third-party service credentials

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📊 Power BI Integration

### Setup Steps

1. **Publish Reports to Power BI Service**
   - Create your reports in Power BI Desktop
   - Publish to Power BI Service workspace

2. **Generate Embed Tokens**
   - Register app in Azure AD
   - Configure API permissions
   - Generate embed tokens using Power BI REST API

3. **Update Configuration**
   - Add report URLs to configuration table
   - Configure embed settings

See [docs/POWERBI.md](docs/POWERBI.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [User Guide](docs/USER_GUIDE.md)
- [API Documentation](docs/API.md)
- [Database Schema](docs/DATABASE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

### Troubleshooting

**Database Connection Issues:**
```bash
# Test connection
sqlcmd -S your-server -U your-user -P your-password -Q "SELECT 1"
```

**Port Already in Use:**
```bash
# Change port in backend/.env
PORT=5001
```

**CORS Issues:**
- Update `REACT_APP_API_URL` in frontend/.env
- Configure CORS in backend server.js

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Document version control
- [ ] Integration with GovWin
- [ ] Advanced workflow automation
- [ ] Multi-language support
- [ ] Dark mode

## 👥 Authors

* **Your Name** - *Initial work*

## 🙏 Acknowledgments

* Government contracting best practices
* Salesforce opportunity management patterns
* Modern React development patterns

---

**Built with ❤️ for government contracting teams**