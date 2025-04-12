import mysql from 'mysql2/promise'


let connection: mysql.Connection | undefined;
export const createConnection= async () =>{
    if(!connection){
        connection = await mysql.createConnection({
            host:process.env.DATABASE_HOST,
            user:process.env.DATABASE_USER,
            password:process.env.DATABASE_PASSWORD,
            database:process.env.DATABASE_NAME,
        })
    }   
    return connection;
}



// Create a connection pool
// export const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });