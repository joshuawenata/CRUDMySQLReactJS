const express = require('express')
const app = express()
const mySQL = require('mysql')
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mySQL.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'reactjsdb',
})

app.post('/create', (req, res) => {
    const value = req.body.value;

    db.query('INSERT INTO todo (value) VALUES (?)', [value], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send('Value Inserted');
        }
    })
})

app.get('/read', (req, res) => {
    db.query('SELECT * FROM todo', (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    const temp = req.body.temp
    db.query('UPDATE todo SET value = ? WHERE id = ?', [temp, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.delete('/deletes/:id', (req,res)=>{
    const id = req.params.id
    db.query("DELETE FROM todo WHERE id = ?", id, (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})

app.listen(3001,()=>{
    console.log('yay, your server is running on port 3001')
})

