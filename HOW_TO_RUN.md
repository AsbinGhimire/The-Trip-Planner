# How to Run The Trip Planner

## ✅ Setup Complete!

All dependencies are installed and the database is configured. You're ready to run the application.

## 🚀 Starting the Application

### From Your Terminal

1. Open a terminal in the project directory
2. Run:
   ```bash
   npm start
   ```
3. Wait for the message: `Server has started at port 3000`
4. Open your browser and go to: **http://localhost:3000**

### Troubleshooting: Port Already in Use

If you see the error `EADDRINUSE: address already in use :::3000`, it means another instance is already running.

**Solution 1: Stop all Node processes**
```powershell
Get-Process -Name node | Stop-Process -Force
```
Then run `npm start` again.

**Solution 2: Change the port**
Edit the `.env` file and change:
```
PORT = 3000
```
to another port like:
```
PORT = 3001
```

## 🔑 Login Credentials

- **Email**: admin@gmail.com
- **Password**: password

## 📝 Important Notes

- The application uses **nodemon** which auto-restarts when you make code changes
- To stop the server, press `Ctrl+C` in the terminal
- The database `myfyp` has already been created
- All tables will be created automatically on first run

## 🎯 Quick Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server |
| `npm run setup:db` | Create/recreate the database |

## ✨ You're All Set!

The application is fully configured and ready to use. Just run `npm start` and start planning trips!
