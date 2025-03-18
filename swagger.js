const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API CRUD'
  },
  host: 'https://cse341-4p35.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);