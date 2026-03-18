import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class NoBrowserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const ua = req.headers['user-agent'] || '';
    // Allow curl/Postman/any non-browser
    if (/curl|Postman|HTTPie/i.test(ua)) {
      return true;
    }
    throw new ForbiddenException('Please use curl or Postman to access this endpoint');
  }
}