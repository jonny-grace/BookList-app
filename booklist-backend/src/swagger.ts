import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booklist API',
      version: '1.0.0',
      description: 'A simple API for managing a booklist',
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJSDoc(options);

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};