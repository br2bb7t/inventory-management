const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./api/productRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(cors({
  origin: 'http://localhost',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Gestión de Inventario',
      version: '1.0.0',
      description: 'API para gestionar un inventario de productos',
    },
  },
  apis: ['./api/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(bodyParser.json());

app.use('/api/products', productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3001, () => {
  console.log('Backend corriendo en el puerto 3001');
  console.log('Documentación Swagger disponible en http://localhost:3001/api-docs');
});
