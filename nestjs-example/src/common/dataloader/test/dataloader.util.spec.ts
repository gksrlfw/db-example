import { DataloaderUtil } from '@src/common/dataloader/dataloader.util';

describe('DataloaderUtil 테스트', () => {
  describe('responseList<T, K>(keys: T[], values: K[], property: string) 테스트', () => {
    type Test1 = {
      id: number;
      title: string;
      userId: number;
    };

    it('null 이 없는 경우', () => {
      const keys = [1, 2];
      const values = [
        {
          id: 1,
          title: '첫번째',
          userId: 1,
        },
        {
          id: 2,
          title: '두번째',
          userId: 1,
        },
        {
          id: 3,
          title: '세번째',
          userId: 2,
        },
        {
          id: 3,
          title: '세번째',
          userId: 3,
        },
      ];

      const input = DataloaderUtil.responseList<number, Test1>(
        keys,
        values,
        'userId',
      );
      const result = [
        [
          { id: 1, title: '첫번째', userId: 1 },
          { id: 2, title: '두번째', userId: 1 },
        ],
        [{ id: 3, title: '세번째', userId: 2 }],
      ];

      expect(input).toEqual(result);
    });

    it('null 이 있는 경우', () => {
      const keys = [1, 2, 3, 4];
      const values = [
        {
          id: 1,
          title: '첫번째',
          userId: 1,
        },
        {
          id: 2,
          title: '두번째',
          userId: 1,
        },
        {
          id: 3,
          title: '세번째',
          userId: 2,
        },
        {
          id: 3,
          title: '세번째',
          userId: 3,
        },
      ];

      const input = DataloaderUtil.responseList<number, Test1>(
        keys,
        values,
        'userId',
      );
      const result = [
        [
          { id: 1, title: '첫번째', userId: 1 },
          { id: 2, title: '두번째', userId: 1 },
        ],
        [{ id: 3, title: '세번째', userId: 2 }],
        [{ id: 3, title: '세번째', userId: 3 }],
        null,
      ];

      expect(input).toEqual(result);
    });
  });
});
