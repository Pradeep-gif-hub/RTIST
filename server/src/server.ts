import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import projectsRouter from './routes/projects.js';
import eventsRouter from './routes/events.js';
import teamRouter from './routes/team.js';
import facultyRouter from './routes/faculty.js';
import galleryRouter from './routes/gallery.js';
import achievementsRouter from './routes/achievements.js';
import docsRouter from './routes/docs.js';
import newsRouter from './routes/news.js';
import recruitmentRouter from './routes/recruitment.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Telemetry Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'RTIST Base Station API',
    institution: 'NIT Jalandhar',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/team', teamRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/achievements', achievementsRouter);
app.use('/api/docs', docsRouter);
app.use('/api/news', newsRouter);
app.use('/api/recruitment', recruitmentRouter);

// Error Handling
app.use(errorHandler);

// Connect DB and Start Server
async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`[RTIST API Server] Running on http://localhost:${PORT}`);
    console.log(`[RTIST API Server] Ready to receive telemetry requests`);
  });
}

startServer();

export default app;
