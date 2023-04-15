import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserDTO } from './DTO/user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users') // swagger doc tag
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // jwt authorization para acceso a endpoints
@Controller('api/v1/user')
export class UserController {

    constructor( private readonly userService: UserService) {}

    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string ){
        return this.userService.getById(id);
    }

    @Post()
    create(@Body() userDTO: UserDTO) {
        return this.userService.create(userDTO);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userDTO: UserDTO ) {
        return this.userService.update(id, userDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }

    
}
