import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { CoreModule } from '@src/core/core.module';

/**
 * TODO
 */
describe('PostModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('getUsers test', () => {
    it('case 1.', async () => {
      const query = `
query {
  getUsers {
    id
    name
    createdAt
    posts {
      id
      title
      content
    }
  }
}
    `;

      const result = await request(app.getHttpServer()).post('/graphql').send({
        query,
      });

      // TODO
      //  expect()
    });
  });
});
