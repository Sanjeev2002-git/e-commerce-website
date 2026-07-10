# TODO

## Backend auth (OTP/password/social + DTOs)

- [ ] Implement OTP endpoints: AuthService.sendOtp / verifyOtp
- [ ] Extend RedisTokenService with OTP + single-use consumption
- [ ] Implement password forgot/reset endpoints with reset-token consumption and refresh-token invalidation
- [ ] Implement refresh-token rotation endpoint using RedisTokenService
- [ ] Implement social login verify+find-or-create endpoints (Google/Apple)
- [ ] Add class-validator DTOs for all auth endpoints; remove all `@Body() body: any` usages
- [ ] Update EmailOtpService internals to store OTP in Redis (real email delivery mocked/logged)
- [ ] Adjust User.passwordHash nullability or social-user creation mechanism
- [ ] Verify build: `npx tsc -p tsconfig.build.json --noEmit` and `npm run build`
- [ ] Confirm zero matches: `Select-String -Path src\auth\auth.controller.ts -Pattern "Scaffolding only" -List`

