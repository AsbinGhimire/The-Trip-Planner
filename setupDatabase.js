const mysql = require('mysql2/promise');
const dbConfig = require('./config/dbConfig');

async function createDatabase() {
    try {
        // Connect to MySQL without specifying a database
        const connection = await mysql.createConnection({
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            port: 3306
        });

        console.log('Connected to MySQL server...');

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
        console.log(`✅ Database '${dbConfig.DB}' created successfully (or already exists)`);

        await connection.end();
        console.log('\n✅ Database setup complete!');
        console.log('\nYou can now run: npm start');
        
    } catch (error) {
        console.error('❌ Error creating database:', error.message);
        console.log('\n📋 Troubleshooting:');
        console.log('1. Make sure MySQL server is running');
        console.log('2. Check your MySQL credentials in config/dbConfig.js');
        console.log('3. If your MySQL root user has a password, update PASSWORD in config/dbConfig.js');
        process.exit(1);
    }
}

createDatabase();
