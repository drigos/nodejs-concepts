import express from 'express';
import cors from 'cors';

import { uuid } from 'uuidv4';

import findDuplicatedKeys from './lib/findDuplicatedKeys';
import { NotUniqueError } from './errors';
import createRepositoryValidator from './validators/create-repository';

const app = express();

app.use(express.json());
app.use(cors());

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

module.exports = app;
