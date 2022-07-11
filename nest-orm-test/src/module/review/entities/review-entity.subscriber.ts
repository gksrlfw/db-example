import { ReviewEntity } from '@src/module/review/entities/review.entity';
import {
  EntityManager,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { InjectEntityManager } from '@nestjs/typeorm';

/**
 * 훅에 조금 더 복잡한 로직을 작성하고 싶을 때 subscriber 를 이용할 수 있습니다.
 * 역할에 맞게 분리하여 작성할 수 있습니다.
 */
@EventSubscriber()
export class ReviewEntitySubscriber
  implements EntitySubscriberInterface<ReviewEntity>
{
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
  ) {
    manager.connection.subscribers.push(this);
  }

  /**
   *
   */
  listenTo(): ReturnType<EntitySubscriberInterface['listenTo']> {
    return ReviewEntity;
  }

  /**
   *
   * @param event
   */
  async beforeInsert(event: InsertEvent<ReviewEntity>) {
    const { entity, manager } = event;

    entity.createdAt = dayjs();
    entity.updatedAt = dayjs();
  }

  /**
   *
   * @param event
   */
  async beforeUpdate(event: UpdateEvent<ReviewEntity>) {
    const { entity, manager } = event;

    entity.updatedAt = dayjs();
  }
}
