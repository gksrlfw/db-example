import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { AuthService } from '@src/modules/auth/auth.service';

/**
 *
 */
@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authorization = req.headers.authorization;

    // Todo. local 에서는 토큰 없이 접근할 수 있도록 해야합니다.

    if (!authorization) {
      this.logger.error(`authorization 이 없습니다.`);
      throw new CtError(CtErrorType.UnAuthenticated, 'Token is not valid');
    }

    const tokens = authorization.split(' ');

    if (tokens.length !== 2 || tokens[0] !== 'Bearer') {
      this.logger.error(`authorization 이 유효하지 않습니다.`);
      throw new CtError(CtErrorType.UnAuthenticated, 'Token is not valid');
    }
    try {
      req.user = await this.authService.verifyAccessToken(tokens[1]);
      this.logger.debug(`req.user: ${JSON.stringify(req.user)}`);
    } catch (err) {
      if (err.extensions.code !== CtErrorType.AccessTokenExpired) {
        throw err;
      }

      // fixme.
      //  access token 이 만료되었으면 redis 에서 refresh token 확인 후에 재발급합니다.
      //  재발급 한 후, 에러와 함께 토큰을 보내 다시 요청받을지 혹은 response header 에 넣고 요청을 진행할 지.
      //  ex) res.headers.authorization = await this.authService.reissueAccessToken(tokens[1]);

      throw new CtError(
        CtErrorType.AccessTokenExpired,
        `Bearer ${await this.authService.reissueAccessToken(tokens[1])}`,
      );
    }

    return true;
  }
}
