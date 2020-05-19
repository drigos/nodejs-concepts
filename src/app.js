import express from 'express';
import cors from 'cors';

import { uuid } from 'uuidv4';

import jsonResponseFormatter from './middleware/json-response-formatter';
import malformedInputErrorHandler from './middleware/malformed-input-error-handler'
import errorHandler from './middleware/error-handler';
import internalServerErrorHandler from './middleware/internal-server-error-handler';

import { NotUniqueError } from './errors';
import findDuplicatedKeys from './lib/findDuplicatedKeys';
import createRepositoryValidator from './validators/create-repository';

const app = express();

//
// Application middleware:
//

app.use(jsonResponseFormatter);
app.use(cors());
app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
  const repositoryData = createRepositoryValidator(request.body);

  const subjects = findDuplicatedKeys(repositories, repositoryData, [
    'title',
    'url',
  ]);

  if (subjects.length) {
    throw new NotUniqueError('Repository already registered', { subjects });
  }

  // TODO: verify whether `repositoryData.url` exists in GitHub API

  const repository = {
    ...repositoryData,
    id: uuid(),
    likes: 0,
  };
  repositories.push(repository);

  response
    .status(201)
    .location(`/repositories/${repository.id}`)
    .json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

//
// Error handlers:
//

app.use(malformedInputErrorHandler);
app.use(errorHandler);
app.use(internalServerErrorHandler);

export default app;
