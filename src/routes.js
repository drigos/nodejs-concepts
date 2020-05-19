import { Router } from 'express';

import { uuid } from 'uuidv4';

import { NotUniqueError, NotFoundError } from './lib/errors';
import findDuplicatedKeys from './lib/findDuplicatedKeys';
import createRepositoryValidator from './validators/create-repository';
import updateRepositoryValidator from './validators/update-repository';

const routes = new Router();

const repositories = [];

routes.get("/repositories", (_, response) => {
  response.json(repositories);
});

routes.post("/repositories", ({ body }, response) => {
  const repositoryData = createRepositoryValidator(body);

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

routes.put("/repositories/:id", ({ params, body }, response) => {
  const repositoryData = updateRepositoryValidator(body);
  const { title, url } = repositoryData;

  const repository = repositories.find((repository) => repository.id === params.id);

  if (!repository) {
    throw new NotFoundError('Repository not found', { subjects: 'id' });
  }

  const conditionals = [];
  if (title && title !== repository.title) conditionals.push('title');
  if (url && url !== repository.url) conditionals.push('url');

  const subjects = findDuplicatedKeys(repositories, repositoryData, conditionals);

  if (subjects.length) {
    throw new NotUniqueError('Repository already registered', { subjects });
  }

  // TODO: verify whether `repositoryData.url` exists in GitHub API

  const repositoryIndex = repositories.findIndex((repository) => repository.id === params.id);
  const removedRepository = repositories.splice(repositoryIndex, 1).pop();
  const updatedRepository = { ...removedRepository, ...repositoryData }
  repositories.push(updatedRepository);

  response.json(updatedRepository);
});

routes.delete("/repositories/:id", (request, response) => {
  // TODO
});

routes.post("/repositories/:id/like", (request, response) => {
  // TODO
});

export default routes;
