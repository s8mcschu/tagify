import userRouter from "./routes/user";
import consentRoutes from "./routes/consent";
import questionnaireRoutes from "./routes/questionnaire";
import tagRoutes from './routes/tags';
import abortRoutes from "./routes/abort"
import calibrationRoutes from "./routes/calibration"

export const routers = [
  userRouter,
  consentRoutes,
  questionnaireRoutes,
  tagRoutes,
  abortRoutes,
  calibrationRoutes
]