import { Controller,Post,Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller()
export class AuthController{

    constructor(private authService:AuthService){}

    @Post("register")
    register(@Body() body) {
        return this.authService.register(
            body.name,
            body.email,
            body.password
        )
    }

    @Post("login")
    login(@Body() body) {
        return this.authService.login(
            body.email,
            body.password
        )
    }
}