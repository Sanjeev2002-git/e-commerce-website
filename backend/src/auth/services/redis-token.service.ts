import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisTokenService {
  private readonly logger = new Logger(RedisTokenService.name);
  private readonly redis: Redis;

  constructor() {
    const host = process.env.REDIS_HOST ?? 'localhost';
    const port = Number(process.env.REDIS_PORT ?? 6379);
    const password = process.env.REDIS_PASSWORD ?? undefined;
    const maxRetries = 5;

    this.redis = new Redis({
      host,
      port,
      password,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      retryStrategy(times) {
        if (times >= maxRetries) {
          return undefined;
        }
        return Math.min(1000 * times, 5000);
      },
      connectTimeout: 5000,
      enableReadyCheck: true,
    });

    this.redis.on('error', (error) => {
      this.logger.error(`Redis error: ${error?.message ?? String(error)}`);
    });
    this.redis.on('close', () => {
      this.logger.warn('Redis connection closed');
    });
    this.redis.on('reconnecting', (delay) => {
      this.logger.warn(`Redis reconnecting in ${delay}ms`);
    });

    void this.redis.connect().catch((error) => {
      this.logger.error(`Failed to connect to Redis at ${host}:${port}: ${error?.message ?? String(error)}`);
    });
  }

  private key(userId: string) {
    return `auth:refresh:${userId}`;
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    const expirySeconds = this.refreshExpirySeconds();
    try {
      await this.redis.set(this.key(userId), refreshToken, 'EX', expirySeconds);
      return { stored: true, userId };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to store refresh token for user ${userId}: ${message}`);
      throw new ServiceUnavailableException('Unable to save refresh session because Redis is unavailable. Please try again later.');
    }
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    try {
      const stored = await this.redis.get(this.key(userId));
      return { valid: stored !== null && stored === refreshToken, userId };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to validate refresh token for user ${userId}: ${message}`);
      throw new ServiceUnavailableException('Unable to validate refresh token because Redis is unavailable.');
    }
  }

  private refreshExpirySeconds() {
    const raw = process.env.JWT_REFRESH_TOKEN_EXPIRY ?? '7d';
    // very small parser: supports m/h/d
    const match = /^([0-9]+)([mhd])$/.exec(raw);
    if (!match) return 7 * 24 * 60 * 60;
    const num = Number(match[1]);
    const unit = match[2];
    if (unit === 'm') return num * 60;
    if (unit === 'h') return num * 60 * 60;
    return num * 24 * 60 * 60;
  }
}


