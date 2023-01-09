import { compare, genSalt, hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from 'database/models/user.entity';
import { AuthModule } from 'api/auth/auth.module';
import { createTestingModule } from '__tests__/utils';
import { userData } from '__tests__/seeds/user';
import { SignUpService } from 'api/auth/services/SignUpService';
import type { AuthCredentialsDto } from 'api/auth/dto/auth-credential.dto';

describe('SignUpService', () => {
  let dataSource: DataSource;
  let jwtService: JwtService;
  let signUpService: SignUpService;

  const userDto: AuthCredentialsDto = {
    username: userData.username,
    password: userData.password,
  };

  beforeAll(async () => {
    const { module } = await createTestingModule({
      imports: [AuthModule],
      entities: [User],
    });

    dataSource = module.get(DataSource);
    signUpService = module.get(SignUpService);
    jwtService = module.get(JwtService);
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'fakeToken');
  });

  afterEach(async () => {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.manager.query('TRUNCATE users CASCADE');
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('signUp', () => {
    it('should return user', async () => {
      const salt = await genSalt();
      const hashedPassword = await hash(userDto.password, salt);

      const userSignUp = await signUpService.exec(userDto);

      expect(userSignUp.authToken).toEqual('fakeToken');
      expect(userSignUp.profile.username).toEqual(userDto.username);
      expect(compare(userDto.password, hashedPassword));
    });
  });
});
