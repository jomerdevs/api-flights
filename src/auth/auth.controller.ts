import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDTO } from 'src/user/DTO/user.dto';

@ApiTags('Authentication')
@Controller('api/v1/auth')
export class AuthController {

    constructor( private readonly authService: AuthService ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
        return await this.authService.singIn( req.user );
    }

    @Post('register')
    async register(@Body() userDto: UserDTO) {
        return await this.authService.register( userDto );
    }
}
