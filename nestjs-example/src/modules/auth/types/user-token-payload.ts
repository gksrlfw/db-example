import { classToPlain } from 'class-transformer';

/**
 *
 */
export class UserTokenPayload {
  id: string;
  name: string;

  toJson() {
    return classToPlain(this);
  }
}
