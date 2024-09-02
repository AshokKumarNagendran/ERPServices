const express = require('express');
const mongoose = require('mongoose');
const APIRouter = require('./Router/APIRouter.js');
//mongodb url and port number are read from config.js
const config = require('./config.js');
const port=config.port;
const mongoDBUrl= config.mongoDBUrl;
const application = express();
application.use(express.json());
//uncomment below CORS (Croos-origin resource sharing) in-case integrated with UI
//app.use(cors());
//DBConnection
mongoose.connect(mongoDBUrl).then(() => {
    console.log('Connected to MongoDB server is Successful!');
    //Node server
    application.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
).catch((error) => {
    console.log(error);
});
//Routing to APIRouter.JS
application.use('/erp', APIRouter);
//ping
application.get('/ping', (req, res) => {
    res.status(200).send('Server Reachable!');
});