const mysql = require("mysql");
const configArray=require('../config/config.js')
const util = require('util');
// const makeDb=()=>{
//     const conn =  mysql.createConnection();
//     const query = util.promisify(conn.query).bind(conn);
// return query
// }
const makeDb=()=>{
const connection = mysql.createConnection({host:'localhost', user: 'root', database: 'myshopcart'});
return {
    query(sql, args)
     {return util.promisify(connection.query).call(connection, sql, args)}
     ,
    close()
    {return util.promisify(connection.end).call(connection);},
    escape(val) 
    {return connection.escape(val);}};
}
module.exports = {makeDb};
