import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

import { GetProfileService } from 'api/auth/services/GetProfileService';
import type { User } from 'database/models/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly getProfileService: GetProfileService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.getProfileService.exec(username);
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Please check your login credentials');
    }
    return user;
  }
}
