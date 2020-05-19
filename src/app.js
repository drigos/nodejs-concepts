import express from 'express';
import cors from 'cors';

import routes from './routes';
import {
  traceErrors,
  errorHandler,
  jsonResponseFormatter,
  internalServerErrorHandler,
  malformedInputErrorHandler,
} from './middleware';

const app = express();

//
// Application middleware:
//

app.use(jsonResponseFormatter);
app.use(cors());
app.use(express.json());
app.use(routes);

//
// Error handlers:
//

app.use(malformedInputErrorHandler);
app.use(errorHandler);
app.use(traceErrors);
app.use(internalServerErrorHandler);

export default app;
