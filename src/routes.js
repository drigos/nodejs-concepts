import { Router } from 'express';

import { uuid } from 'uuidv4';

import { NotUniqueError } from './lib/errors';
import findDuplicatedKeys from './lib/findDuplicatedKeys';
import createRepositoryValidator from './validators/create-repository';

const routes = new Router();

const repositories = [];

routes.get("/repositories", (request, response) => {
  // TODO
});

routes.post("/repositories", (request, response) => {
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

routes.put("/repositories/:id", (request, response) => {
  // TODO
});

routes.delete("/repositories/:id", (request, response) => {
  // TODO
});

routes.post("/repositories/:id/like", (request, response) => {
  // TODO
});

export default routes;
