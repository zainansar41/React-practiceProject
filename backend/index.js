const express = require('express');
const connectToMongo = require("./db/db.js")
const cookieParser=require('cookie-parser')
const cors= require('cors')

const app = express();
const port = 3001;

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())


connectToMongo();


app.get('/', (req,res)=>{
    res.send("hello world")
})
app.use('/auth', require('./routes/auth'))
app.use('/Notes', require('./routes/NotesApi.js'))

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
