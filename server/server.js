const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");


const port = 5000 || process.env.PORT;

require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


const routes = require('./Routes/routes');


app.get('/summery',routes);
app.post('/Add-appointment',routes);
app.post('/Delete-appointment',routes);
app.post('/Update-appointment',routes);


app.listen(port,() => {
    console.log(`Listening On PORT ${port}`)
})