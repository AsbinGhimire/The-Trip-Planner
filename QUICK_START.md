# Quick Start Instructions

## ⚠️ IMPORTANT: Database Setup Required

The application is **ready to run** but requires MySQL database setup first.

### Step 1: Ensure MySQL is Running

Make sure your MySQL server is running on your system.

### Step 2: Create the Database

You need to create a database named `myfyp`. Choose one of these methods:

#### Option A: Using MySQL Command Line
```bash
mysql -u root -p
```
Then run:
```sql
CREATE DATABASE myfyp;
EXIT;
```

#### Option B: Using phpMyAdmin
1. Open phpMyAdmin (usually at http://localhost/phpmyadmin)
2. Click "New" in the left sidebar
3. Enter database name: `myfyp`
4. Click "Create"

#### Option C: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your local MySQL server
3. Click "Create a new schema" button
4. Enter schema name: `myfyp`
5. Click "Apply"

### Step 3: Update Database Credentials (if needed)

If your MySQL root user has a password, update `config/dbConfig.js`:
```javascript
PASSWORD: "your_mysql_password",  // Currently set to empty string
```

### Step 4: Start the Application

```bash
npm start
```

The application will:
- ✅ Automatically create all database tables
- ✅ Seed an admin user (email: admin@gmail.com, password: password)
- ✅ Start the server on http://localhost:3000

---

## 📋 What's Already Done

✅ All npm dependencies installed  
✅ Environment variables configured  
✅ Application structure verified  

## 🔑 Default Admin Credentials

After the database is set up and the app starts:
- **Email**: admin@gmail.com
- **Password**: password

## 📚 Full Documentation

See `SETUP_GUIDE.md` for complete setup instructions and troubleshooting.

---

**Next Step**: Create the MySQL database `myfyp` and run `npm start`
