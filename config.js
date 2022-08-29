require('dotenv').config()

const url = process.env.BD_URL;
const port = process.env.PORT || 8000;
const domain = process.env.DOMAIN;

module.exports = {url, port, domain};