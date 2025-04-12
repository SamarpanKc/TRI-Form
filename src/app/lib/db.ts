import mysql from 'mysql2/promise';

let connection: mysql.Connection | undefined;

export const createConnection = async () => {
    if (!connection) {
        connection = await mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        });
    }
    return connection;
};

// Function to fetch updated rows
export const fetchUpdatedRows = async () => {
    const conn = await createConnection();
    const [rows] = await conn.execute(
        `SELECT * FROM test_workshop WHERE status = 'Pending' AND registrationDate IS NOT NULL`
    );
    return rows;
};