const config = require('./config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const apiRoutes = require("./src/modules/routes/task");

app.use(cors());
app.use(express.json());
app.use("/", apiRoutes);

const appServerInit = () => {
  try {
    mongoose.connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(config.port, () => {
      console.log('server started on ' + config.domain + ':' + config.port)
    });
  } catch(error) {
    console.error(error);
    process.exit(1);
  }  
};

appServerInit();