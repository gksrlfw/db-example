import { UserEntity } from '@src/modules/user/entities/user.entity';
import { User } from '@src/core/autogen/schema.graphql';

describe('UserEntity test', () => {
  // TODO
  //  entity 캡슐화에 대해 고민해야합니다.

  let instance: UserEntity;

  beforeEach(() => {
    instance = new UserEntity();
  });

  it('toUser 테스트', () => {
    instance.id = '1';
    instance.name = '한길';
    instance.age = 27;

    const input = instance.toUser();
    const result = Object.assign(new User(), {
      id: '1',
      name: '한길',
      age: 27,
    });

    expect(input).toEqual(result);
  });
});
