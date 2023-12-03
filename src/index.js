const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser'); //nhận req.body từ client gửi lên
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(cookieParser());
routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect successful');
    })
    .catch(err => {
        console.log(err);
    });


app.listen(port, () => {
    console.log("server listening on port: ", + port);
});