import { Injectable, Logger } from '@nestjs/common';

/**
 * In-memory refresh token store (no Redis required).
 * Stores one refresh token per user. On server restart tokens are cleared
 * and users will need to log in again — acceptable for dev/portfolio use.
 */
@Injectable()
export class RedisTokenService {
  private readonly logger = new Logger(RedisTokenService.name);
  private readonly store = new Map<string, { token: string; expiresAt: number }>();

  private key(userId: string) {
    return `auth:refresh:${userId}`;
  }

  private refreshExpiryMs(): number {
    const raw = process.env.JWT_REFRESH_TOKEN_EXPIRY ?? '7d';
    const match = /^([0-9]+)([mhd])$/.exec(raw);
    if (!match) return 7 * 24 * 60 * 60 * 1000;
    const num = Number(match[1]);
    const unit = match[2];
    if (unit === 'm') return num * 60 * 1000;
    if (unit === 'h') return num * 60 * 60 * 1000;
    return num * 24 * 60 * 60 * 1000;
  }

  async storeRefreshToken(userId: string, refreshToken: string) {
    const expiresAt = Date.now() + this.refreshExpiryMs();
    this.store.set(this.key(userId), { token: refreshToken, expiresAt });
    this.logger.log(`Refresh token stored for user ${userId}`);
    return { stored: true, userId };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const entry = this.store.get(this.key(userId));
    if (!entry) return { valid: false, userId };
    if (Date.now() > entry.expiresAt) {
      this.store.delete(this.key(userId));
      return { valid: false, userId };
    }
    return { valid: entry.token === refreshToken, userId };
  }

  async deleteRefreshToken(userId: string) {
    this.store.delete(this.key(userId));
    return { deleted: true, userId };
  }
}
