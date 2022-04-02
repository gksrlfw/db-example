import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Todo
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {}
