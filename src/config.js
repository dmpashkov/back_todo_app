require('dotenv').config()
const config = {};

config.url = process.env.BD_URL;
config.port = process.env.PORT || 8000;
config.domain = process.env.DOMAIN;

module.exports = config;