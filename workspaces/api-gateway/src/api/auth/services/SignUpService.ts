import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import type { Repository } from 'typeorm';

import { User } from 'database/models/user.entity';
import { CreateCartService } from 'api/v1/carts/services/CreateCartService';
import type { AuthCredentialsDto } from 'api/auth/dto/auth-credential.dto';
import type { IAuthProps, IJwtPayload } from 'api/auth/auth.interface';

@Injectable()
export class SignUpService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private createCartService: CreateCartService,
  ) {}

  async exec({ username, password }: AuthCredentialsDto): Promise<IAuthProps> {
    const payload: IJwtPayload = { username };
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const user = this.userRepository.create({
      username: username,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);

      await this.createCartService.exec({ userId: user.id });

      return {
        profile: user,
        authToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      if (error['code'] === '23505') {
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
