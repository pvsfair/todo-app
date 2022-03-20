import express from 'express';
import projectsRoutes from './routes/projects.routes.js';
import tasksRoutes from './routes/tasks.routes.js';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.use('/api/projects', projectsRoutes);
app.use('/api/projects/:projId/task', tasksRoutes);

export default app;
