import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '@src/modules/auth/auth.service';
import { JoinInput, LoginInput, User } from '@src/core/autogen/schema.graphql';
import { Logger } from '@nestjs/common';

@Resolver('auth')
export class AuthResolver {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly authService: AuthService) {}

  @Mutation('join')
  join(@Args('input') input: JoinInput): Promise<User> {
    this.logger.debug(`join(input: ${JSON.stringify(input)})`);
    return this.authService.join(
      input.id,
      input.password,
      input.name,
      input.age,
    );
  }

  @Mutation('login')
  async login(
    @Args('input') input: LoginInput,
    @Context() context: any,
  ): Promise<User> {
    this.logger.debug(`login(input: ${JSON.stringify(input)})`);
    const user = await this.authService.login(input.id, input.password);
    // fixme. playground 설정 후 확인 필요.
    context.res.header(`Authentication`, user.token);
    return user;
  }
}
