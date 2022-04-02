import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

/**
 *
 */
export abstract class TokenService {
  protected readonly logger: Logger = new Logger(this.constructor.name);
  protected jwtService: JwtService;

  protected constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  sign(payload: string | Buffer | object, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  verifyAsync<T extends object = any>(token: string): Promise<T> {
    return this.jwtService.verifyAsync<T>(token);
  }

  /**
   *
   * @param token
   */
  abstract verifyToken(token: string);
}
