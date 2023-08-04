
import { AppDataSource } from './database';
import express from 'express';
import bookRoutes from './routes/bookRoutes';
import swagger from './swagger';
import cors from 'cors';

AppDataSource.initialize()
  .then(async() => {
    
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/books', bookRoutes);
    
    swagger(app)
     app.listen(4000, () => {
      console.log('Server started on http://localhost:4000');
    });
    
  })
  .catch((error) => {
    console.log('Error connecting to database', error);
  });
  