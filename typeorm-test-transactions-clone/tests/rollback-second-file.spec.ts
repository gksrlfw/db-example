import { User } from './entities/user.entity';
import { Connection } from 'typeorm';
import { runInTransaction, initialiseTestTransactions } from '../src';
import { initialiseTestDatabase } from './initialise-test-database';

/**
 * The point of this file is to show that it still works even
 * when you initialise for the second time and run similar
 * (or in my case, the same) tests.
 */

initialiseTestTransactions();

describe('rollback tests - duplicated', () => {
  let connection: Connection = null;

  beforeAll(async () => {
    connection = await initialiseTestDatabase();
    User.useConnection(connection);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('rolls back the creation of an entity if it is wrapped in the transaction function', async () => {
    const email = 'sameuser@gmail.com';
    await runInTransaction(async () => {
      const user = User.create({ email });
      await user.save();
      const found = await User.findOne({
        where: { email },
      });
      expect(found).toBeDefined();
    }, 'test')();

    await runInTransaction(async () => {
      const user = User.create({ email });
      await user.save();
      const found = await User.findOne({
        where: { email },
      });
      expect(found).toBeDefined();
    }, 'test')();
  });

  it('rolls back multiple inserts', async () => {
    await runInTransaction(async () => {
      let email = 'user1@gmail.com';
      await User.create({ email }).save();
      let found = await User.findOne({
        where: { email },
      });
      expect(found).toBeDefined();

      email = 'user2@gmail.com';
      await User.create({ email }).save();
      found = await User.findOne({
        where: { email },
      });
      expect(found).toBeDefined();

      expect(await User.count()).toBe(2);
    }, 'test')();

    await runInTransaction(async () => {
      expect(await User.count()).toBe(0);
    }, 'test')();
  });
});
