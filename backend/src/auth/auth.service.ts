import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../db/typeorm/entities/User.entity';
import { RedisTokenService } from './services/redis-token.service';
import { signAccessToken, verifyAccessToken, JwtPayload } from './token/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    private readonly redisTokenService: RedisTokenService,
  ) {}

  signAccessToken(userId: string, roles: string[], secret: string): string {
    const payload: JwtPayload = { userId, roles };
    const expiry = process.env.JWT_ACCESS_TOKEN_EXPIRY ?? '15m';
    return signAccessToken(payload, secret, expiry);
  }

  verifyAccessToken(token: string, secret: string): JwtPayload {
    return verifyAccessToken(token, secret);
  }

  private signRefreshToken(userId: string, roles: string[]): string {
    const secret = process.env.JWT_REFRESH_TOKEN_SECRET ?? 'change_me_refresh';
    const expiry = process.env.JWT_REFRESH_TOKEN_EXPIRY ?? '7d';
    return signAccessToken({ userId, roles }, secret, expiry);
  }

  private toPublicUser(user: User) {
    return { id: user.id, name: user.name, email: user.email };
  }

  async signup(dto: SignupDto) {
    const existing = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone ?? null,
      passwordHash,
    });
    await this.usersRepo.save(user);

    return this.issueTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.issueTokens(user);
  }

  private async issueTokens(user: User) {
    const roles: string[] = [];
    const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET ?? 'change_me';

    const accessToken = this.signAccessToken(user.id, roles, accessSecret);
    const refreshToken = this.signRefreshToken(user.id, roles);

    await this.redisTokenService.storeRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: this.toPublicUser(user),
    };
  }
}
