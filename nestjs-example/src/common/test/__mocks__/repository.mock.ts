/**
 *
 */
export namespace RepositoryMock {
  export const postRepositoryMock = {
    save: jest.fn().mockReturnThis,
    create: jest.fn().mockReturnThis,
    toString: jest.fn().mockReturnThis,
    getAllPosts: jest.fn().mockReturnThis,
    getAllPostsByUser: jest.fn().mockReturnThis,
    getAllPostsByUsers: jest.fn().mockReturnThis,
  };
}
