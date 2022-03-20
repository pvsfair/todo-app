import express from 'express';
import projectsRoutes from './routes/projects.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import authRoutes from './routes/auth.routes.js';
import auth from './middlewares/authentication.js';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.send('Hello World');
});

app.use('/api', authRoutes);

app.use('/api/projects', auth, projectsRoutes);
app.use('/api/projects/:projId/task', auth, tasksRoutes);

export default app;
