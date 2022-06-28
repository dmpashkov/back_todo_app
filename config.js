require('dotenv').config()

const config = {
  url: process.env.BD_URL,
  port: process.env.PORT || 8000,
  domain: process.env.DOMAIN
};

module.exports = config;