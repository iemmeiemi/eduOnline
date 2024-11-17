const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3030;
const dbConnect = require('./apis/config/dbConnect');
const initRoutes = require('./apis/routers');

require('dotenv').config();


//middleware
app.use(cors());
app.use(express.json());

//mongodb config
dbConnect();

//import routers
initRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening on: http://localhost:${port}/`);
});
