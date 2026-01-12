# Trip Planner - Setup Guide

## Prerequisites
- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (comes with Node.js)

## Database Configuration

The application is configured to connect to MySQL with the following settings (in `config/dbConfig.js`):
- **Host**: localhost
- **User**: root
- **Password**: (empty)
- **Database**: myfyp
- **Port**: 3306

### Important: Create the Database

Before running the application, you need to create the MySQL database. Run this command in MySQL:

```sql
CREATE DATABASE myfyp;
```

Or use your MySQL client (phpMyAdmin, MySQL Workbench, etc.) to create a database named `myfyp`.

## Installation Steps

1. **Install Dependencies** ✅ (Already completed)
   ```bash
   npm install
   ```

2. **Configure Environment Variables** ✅ (Already configured in `.env`)
   - PORT: 3000
   - SECRET_KEY: "haha"
   - EMAIL: dptest1230@gmail.com
   - EMAIL_PASSWORD: gslhbcoyoyazvaxj
   - BACKEND_URL: http://localhost:3000/

3. **Ensure MySQL is Running**
   - Make sure your MySQL server is running
   - Verify the database `myfyp` exists

4. **Start the Application**
   ```bash
   npm start
   ```

## What Happens on First Run

When you start the application for the first time:
1. Sequelize will automatically create all required database tables
2. An admin user will be seeded with these credentials:
   - **Email**: admin@gmail.com
   - **Password**: password
   - **Role**: admin

## Running the Application

```bash
npm start
```

The application will start on: **http://localhost:3000**

## Default Admin Credentials

- **Email**: admin@gmail.com
- **Password**: password

## Features

- Trip planning with map integration (Mapbox)
- Hotel booking system
- User authentication
- Location reviews
- Payment integration (Khalti)
- Admin panel

## Troubleshooting

### Database Connection Error
If you see a database connection error:
1. Verify MySQL is running
2. Check if the database `myfyp` exists
3. Verify the credentials in `config/dbConfig.js` match your MySQL setup

### Port Already in Use
If port 3000 is already in use, change the PORT in `.env` file.

### Missing Dependencies
Run `npm install` again to ensure all dependencies are installed.
