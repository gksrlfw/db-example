import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError } from 'jsonwebtoken';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { TokenService } from '@src/modules/auth/token/token.service';
import { UserTokenResponse } from '@src/modules/auth/types/user-token-response';

@Injectable()
export class RefreshTokenService extends TokenService {
  private readonly expired = 60 * 60 * 24 * 14;
  constructor(jwtService: JwtService) {
    super(jwtService);
  }

  getExpired(): number {
    return this.expired;
  }

  async verifyToken(token: string): Promise<UserTokenResponse> {
    try {
      return await this.verifyAsync<UserTokenResponse>(token);
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.logger.error(err.message);
        // Todo.
        //  내부적으로 재발급을 해야할까? 아니면 로그인을 다시 시켜야할까?
        throw new CtError(
          CtErrorType.RefreshTokenExpired,
          'refresh token 이 만료되었습니다. 로그아웃해야합니다.',
        );
      }
      this.logger.error(err.message);
      throw new CtError(
        CtErrorType.UnAuthenticated,
        'refresh token 이 유효하지 않습니다.',
      );
    }
  }
}
