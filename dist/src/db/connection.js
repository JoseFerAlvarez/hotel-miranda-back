"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = void 0;
const mysql_1 = __importDefault(require("mysql"));
const connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "hotel",
    password: "hotelmiranda",
    database: "hotelmiranda"
});
function dbQuery(query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, rows) => {
            if (err)
                reject(err);
            resolve(rows);
        });
    });
}
exports.dbQuery = dbQuery;
exports.default = connection;
//# sourceMappingURL=connection.js.map