require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const apiRoutes = require("./src/modules/routes/task");

app.use(cors());

const uri = process.env.BD_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use("/", apiRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log('server started on ' + process.env.DOMAIN + ':' + process.env.PORT)
});