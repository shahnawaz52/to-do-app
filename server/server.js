import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: '',
    database: 'todoapp'
})

//MYSQL
app.get('/todos/:userEmail', (req, res) => {
    // res.send('hello')
    // console.log(req)
    const { userEmail } = req.params;
    // console.log(userEmail)
    pool.getConnection((err, connection) => {
        if(err) throw err;
        console.log(`connected as id ${connection.threadId}`);

        connection.query(`SELECT * FROM todos WHERE user_email = '${userEmail}'`, (err, rows) => {
            connection.release()

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

//Listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))