const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDOcument = require('../swagger-output.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDOcument));

module.exports = router;
