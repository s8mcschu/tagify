import http from 'http';
import express, { Express } from 'express';
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser";
import { routers } from './app/routers'
import { environment } from './environment/config';
import { closeLogger, loggerMiddlewareExpress, logInfo } from './app/logger';
import { cookieMiddleware } from './app/cookies';
import { closeDB } from './app/dbHandler';

const app: Express = express();

app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true, origin: environment.corsOrigins }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add logging
app.use(loggerMiddlewareExpress)

// Check user cookie and assign to group
app.use(cookieMiddleware);

/** Routes */
app.use('/', routers);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
      message: error.message
  });
});

/** Start Server */
const httpServer = http.createServer(app);
const PORT: number = environment.port ?? 3000;
httpServer.listen(PORT, () => logInfo('EXPRESS', `The server is running on port ${PORT}`));

/** On Interrupt */
process.on('SIGINT', async function() {
  await closeDB();
  
  logInfo('EXPRESS', 'Closing Server')
  httpServer.close();
  
  closeLogger();
});