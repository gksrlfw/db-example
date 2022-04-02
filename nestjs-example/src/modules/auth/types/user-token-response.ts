import { UserTokenPayload } from '@src/modules/auth/types/user-token-payload';

/**
 *
 */
export class UserTokenResponse extends UserTokenPayload {
  iat: number;
  exp: number;
}
