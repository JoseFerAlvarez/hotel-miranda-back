import mysql from "mysql";

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
})

function dbQuery(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}


export { dbQuery };
export default connection;
