const express = require("express");
const bodyParser = require("body-parser");
const api = require("./Api");
const app = express();

app.use(bodyParser.json());
app.use('/api/v1', api);
app.listen(5000,()=>{
    console.log("SERVER HIT");
});
