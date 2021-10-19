require('dotenv').config();

module.exports = {
  sessionSecret: process.env.SESSION_SECRET || 'mysecret',
  port: process.env.PORT || 3000,
};
