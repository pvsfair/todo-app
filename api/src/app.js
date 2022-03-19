import express from 'express';
import projectsRoutes from './routes/projects.routes.js';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.use('/api/projects', projectsRoutes);

export default app;
