import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hotel',
    password: 'hotelmiranda',
    database: 'hotelmiranda'
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
