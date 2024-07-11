const {Client} = require('pg')


const client = new Client({
    host :'localhost',
    port:5432,
    database:'FORMATION',
    user:'postgres',
    password:"*******48*****",
})
client.connect((err) => {
    if(err){
        console.log("connection error", err.stack)
    } else {
        console.log("connected");
        client.query('SELECT * FROM usertab', (err, res) => {
            if (err) {
                console.error("Error executing query", err.stack);
            } else {
                console.log("Data from usertab:", res.rows);
            }
            client.end();
        });
    }
})
// export { client };

