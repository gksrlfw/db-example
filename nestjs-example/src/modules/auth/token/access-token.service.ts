import { JwtService } from '@nestjs/jwt';
import { TokenService } from '@src/modules/auth/token/token.service';
import { Injectable } from '@nestjs/common';
import { UserTokenResponse } from '@src/modules/auth/types/user-token-response';
import { TokenExpiredError } from 'jsonwebtoken';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';

@Injectable()
export class AccessTokenService extends TokenService {
  constructor(jwtService: JwtService) {
    super(jwtService);
  }

  async verifyToken(token: string): Promise<UserTokenResponse> {
    try {
      return await this.verifyAsync<UserTokenResponse>(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.logger.debug(
          `err.message: ${err.message}, access token 이 만료되었습니다. 재발급합니다.`,
        );
        throw new CtError(
          CtErrorType.AccessTokenExpired,
          'access token 이 만료되었습니다. 재발급합니다.',
        );
      }
      this.logger.error(err.message);
      throw new CtError(
        CtErrorType.UnAuthenticated,
        'access token 이 유효하지 않습니다.',
      );
    }
  }
}
