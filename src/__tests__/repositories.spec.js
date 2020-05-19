import request from 'supertest';
import app from '../app';

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('Repositories', () => {
  it('should be able to create a new repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      });

    expect(uuidRegex.test(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      url: 'https://github.com/Rocketseat/umbriel',
      title: 'Umbriel',
      techs: ['Node', 'Express', 'TypeScript'],
      likes: 0,
    });
  });

  it('should be able to list the repositories', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/unform',
        title: 'Unform',
        techs: ['React', 'ReactNative', 'TypeScript', 'ContextApi'],
      });

    const response = await request(app).get('/repositories');

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: repository.body.id,
          url: 'https://github.com/Rocketseat/unform',
          title: 'Unform',
          techs: ['React', 'ReactNative', 'TypeScript', 'ContextApi'],
          likes: 0,
        },
      ])
    );
  });

  it('should be able to update repository', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/rocketseat-vscode-reactjs-snippets',
        title: 'VSCode ReactJS snippets',
        techs: ['JSON'],
      });

    const response = await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        url:
          'https://github.com/Rocketseat/rocketseat-vscode-react-native-snippets',
        title: 'VSCode React Native snippets',
        techs: ['JSON'],
      });

    expect(uuidRegex.test(response.body.id)).toBe(true);

    expect(response.body).toMatchObject({
      url:
        'https://github.com/Rocketseat/rocketseat-vscode-react-native-snippets',
      title: 'VSCode React Native snippets',
      techs: ['JSON'],
    });
  });

  it('should not be able to update a repository that does not exist', async () => {
    await request(app).put(`/repositories/123`).expect(404);
  });

  it('should not be able to update repository likes manually', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/ambiente-react-native',
        title: 'Ambiente React Native',
        techs: ['Markdown'],
      });

    await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        likes: 15,
      })
      .expect(400);
  });

  it('should be able to delete the repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios',
        title: 'Bootcamp GoStack desafios',
        techs: ['Markdown'],
      });

    await request(app).delete(`/repositories/${response.body.id}`).expect(204);

    const repositories = await request(app).get('/repositories');

    const repository = repositories.body.find((r) => r.id === response.body.id);

    expect(repository).toBe(undefined);
  });

  it('should be idempotent delete operation', async () => {
    await request(app).delete('/repositories/123').expect(204);
  });
});
