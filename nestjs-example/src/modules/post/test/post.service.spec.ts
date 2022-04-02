import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { PostRepository } from '@src/modules/post/repositories/post.repository';
import { PostService } from '@src/modules/post/post.service';
import { RepositoryMock } from '@src/common/test/__mocks__/repository.mock';
import { LoggerMock } from '@src/common/test/__mocks__/logger.mock';

/**
 * service 의 유닛테스트입니다.
 */
describe('PostService test', () => {
  let app: INestApplication;

  let postService: PostService;
  let postRepository;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: RepositoryMock.postRepositoryMock,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    module.useLogger(new LoggerMock());
    postRepository = RepositoryMock.postRepositoryMock;
    postService = module.get<PostService>(PostService);
  });

  describe('getPosts() test', () => {
    it('case 1.', async () => {
      const result = [
        {
          id: 1,
          title: 'first',
        },
        {
          id: 2,
          title: 'second',
        },
      ];

      jest.spyOn(postRepository, 'getAllPosts').mockResolvedValue(result);
      const input = await postService.getPosts();

      expect(input).toEqual(result);
    });
  });
});
