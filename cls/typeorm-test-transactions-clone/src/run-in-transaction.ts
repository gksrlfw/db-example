import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { RollbackErrorException } from './exceptions/rollback-error-exception';
import { createNamespace } from 'cls-hooked';

export type RunFunction = () => Promise<void> | void;
const scope = createNamespace('recursiveContext');

/**
 * Fix. runInTransaction 에서 connectionName 을 받을 수 있도록 수정합니다.
 * @param func
 * @param connectionName
 */
export function runInTransaction(
  func: RunFunction,
  connectionName: string = 'default',
) {
  return async () => {
    await scope.runPromise(async () => {
      scope.set('connectionName', connectionName);
      try {
        await TransactionCreator.runWithConnection(func);
      } catch (e) {
        if (e instanceof RollbackErrorException) {
          // Do nothing here, the transaction has now been rolled back.
        } else {
          throw e;
        }
      }
    });
  };
}

class TransactionCreator {
  @Transactional({
    connectionName: () => scope.get('connectionName'),
    propagation: Propagation.NESTED,
  })
  static async runWithConnection(func: RunFunction) {
    await func();
    // Once the function has run, we throw an exception to ensure that the
    // transaction rolls back.
    throw new RollbackErrorException(
      `This is thrown to cause a rollback on the transaction.`,
    );
  }
}
