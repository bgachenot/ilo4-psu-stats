import mariadb from 'mariadb';

const db = Object.freeze({
  pool: mariadb.createPool({
    host: `${process.env.DB_HOST}`, 
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    port: `${process.env.DB_PORT}`,
    database: `${process.env.DB_NAME}`,
    connectionLimit: 5
  })
});

export { db };
