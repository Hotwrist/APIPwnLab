import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor (private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const req: Request = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];

        if(!authHeader) throw new UnauthorizedException('Missing Authorization header');

        const [type, token] = authHeader.split(' ');

        if(type !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token format');

        try {
            const payload = this.jwtService.verify(token);
            req['user'] = payload; //attach user info to request
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}