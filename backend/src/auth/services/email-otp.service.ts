import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailOtpService {
  // Mock OTP service. Replace with Twilio/MSG91 later.
  async sendOtp(to: string, otp: string) {
    return { message: 'OTP mock sent', to };
  }

  async verifyOtp(to: string, otp: string) {
    return { valid: true, to };
  }
}

