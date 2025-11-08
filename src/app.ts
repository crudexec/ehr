import 'express-async-errors';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import requestLogger from './middleware/requestLogger';

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for React app
}));
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (config.env !== 'test') {
  app.use(requestLogger);
}

// API routes
app.use('/api/v1', routes);

// Serve static frontend files in production
if (config.env === 'production') {
  const clientPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientPath));

  // Handle React routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
} else {
  // Development - just return API info
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'EHR System API - Development Mode',
      version: '1.0.0',
      api: '/api/v1/health',
      frontend: 'http://localhost:3000',
    });
  });
}

// Error handling
app.use(errorHandler);

export default app;
