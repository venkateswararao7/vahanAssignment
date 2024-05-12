import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    password: "password",
    database: "Assignment",
    port: 5432
})

db.connect();

export default db;
