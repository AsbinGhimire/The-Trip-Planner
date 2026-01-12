# The Trip Planner 🗺️

A comprehensive trip planning application with hotel booking, location reviews, and interactive map features.

## Quick Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)

### Installation

1. **Install Dependencies** (Already done ✅)
   ```bash
   npm install
   ```

2. **Setup Database**
   ```bash
   npm run setup:db
   ```
   This will automatically create the `myfyp` database.

3. **Start the Application**
   ```bash
   npm start
   ```

4. **Access the Application**
   - Open your browser and go to: http://localhost:3000
   - Admin login: admin@gmail.com / password

## Features

- 🗺️ Interactive trip planning with Mapbox integration
- 🏨 Hotel booking system
- 👤 User authentication and profiles
- ⭐ Location and hotel reviews
- 💳 Payment integration (Khalti)
- 👨‍💼 Admin panel for management

## Configuration

### Database Settings
Edit `config/dbConfig.js` if you need to change MySQL credentials:
- Default user: `root`
- Default password: (empty)
- Default database: `myfyp`

### Environment Variables
The `.env` file contains:
- `PORT`: Server port (default: 3000)
- `SECRET_KEY`: JWT secret key
- `EMAIL`: Email for notifications
- `EMAIL_PASSWORD`: Email password
- `BACKEND_URL`: Backend URL

## Default Admin Account

After first run, you can login with:
- **Email**: admin@gmail.com
- **Password**: password

## Troubleshooting

If you encounter any issues, see `SETUP_GUIDE.md` for detailed troubleshooting steps.

### Common Issues

1. **MySQL Connection Error**: Make sure MySQL is running and credentials are correct
2. **Port Already in Use**: Change the PORT in `.env` file
3. **Database Not Found**: Run `npm run setup:db` to create the database

## Documentation

- `QUICK_START.md` - Quick start guide
- `SETUP_GUIDE.md` - Detailed setup instructions

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL with Sequelize ORM
- **Template Engine**: EJS
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer
- **Maps**: Mapbox API
- **Payment**: Khalti API
