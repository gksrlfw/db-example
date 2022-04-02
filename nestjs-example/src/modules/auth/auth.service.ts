import { UserService } from '@src/modules/user/user.service';
import { UserRepository } from '@src/modules/user/repositories/user.repository';
import { User } from '@src/core/autogen/schema.graphql';
import { Injectable, Logger } from '@nestjs/common';
import { CtError } from '@src/common/error/ct-error';
import { CtErrorType } from '@src/common/error/ct-error-type';
import { AccessTokenService } from '@src/modules/auth/token/access-token.service';
import { RefreshTokenService } from '@src/modules/auth/token/refresh-token.service';
import { RedisService } from '@src/common/redis/redis.service';
import { RedisClientType } from 'redis';
import { UserTokenResponse } from '@src/modules/auth/types/user-token-response';
import { UserTokenPayload } from '@src/modules/auth/types/user-token-payload';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  private redisClient: RedisClientType;
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    // this.redisClient = RedisService.get();
    (async () => {
      this.redisClient = await RedisService.get();
      this.logger.debug(`redis client is ready`);
    })();
  }

  /**
   *
   * @param id
   * @param password
   * @param name
   * @param age
   */
  async join(id, password, name, age): Promise<User> {
    this.logger.debug(`join()`);
    this.redisClient = await RedisService.get();

    if (
      await this.userRepository.findOne({
        id,
      })
    ) {
      this.logger.debug(`id: ${id}`);
      throw new CtError(
        CtErrorType.ExistedResources,
        '이미 존재하는 ID 입니다.',
      );
    }

    const instance = this.userRepository.create({
      id,
      password,
      name,
      age,
    });

    await this.userRepository.save(instance);
    return instance;
  }

  /**
   *
   * @param id
   * @param password
   */
  async login(id: string, password: string): Promise<User> {
    this.logger.debug(`login()`);

    const instance = await this.userRepository.findOne({
      id,
    });

    if (!(await instance.validatePassword(password))) {
      this.logger.error(`비밀번호 불일치`);
      throw new CtError(CtErrorType.PermissionDenied, '비밀번호 불일치');
    }

    const payload = instance.toPayload();

    // fixme.
    //  header 에 넣어봅시다.
    //  playground 에서 response header 값을 볼 수 있는 방법을 찾은 후에 진행합니다.
    instance.token = await this.accessTokenService.sign(payload.toJson());

    // fixme.
    //  redis 에 넣습니다.
    //  client 가 refresh token 을 갖고 있지 않을 때 어떤 값을 key 로 하여 refresh token 을 찾을지 정해야 합니다.
    //  현재는 key: accessToken, value: refreshToken 입니다.
    await this.redisClient.set(
      instance.token,
      await this.refreshTokenService.sign(payload.toJson()),
      {
        EX: this.refreshTokenService.getExpired(),
      },
    );
    return instance.toUser();
  }

  /**
   *
   * @param token
   */
  async verifyAccessToken(token: string): Promise<UserTokenResponse> {
    return this.accessTokenService.verifyToken(token);
  }

  /**
   * redis 에서 refresh token 을 확인 후에 재발급합니다.
   * @param accessToken
   */
  async reissueAccessToken(accessToken: string): Promise<string> {
    this.logger.debug(`reissueAccessToken(accessToken: ${accessToken})`);
    const refreshToken = await this.redisClient.get(accessToken);

    if (!refreshToken) {
      this.logger.debug('refresh token 이 만료되었습니다. 로그아웃해야합니다.');
      throw new CtError(
        CtErrorType.RefreshTokenExpired,
        'refresh token 이 만료되었습니다. 로그아웃해야합니다.',
      );
    }

    const result = await this.refreshTokenService.verifyToken(refreshToken);
    const newToken = await this.accessTokenService.sign(
      Object.assign(new UserTokenPayload(), {
        id: result.id,
        name: result.name,
      }).toJson(),
    );

    // refreshToken 의 key 를 변경합니다.
    await this.redisClient.rename(accessToken, newToken);

    return newToken;
  }
}
