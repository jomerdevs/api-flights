import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './DTO/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('passengers') // swagger doc tag
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // jwt authorization para acceso a endpoints
@Controller('api/v1/passenger')
export class PassengerController {

    constructor( private readonly passengerService: PassengerService ){}

    @Get()
    getAll() {
        return this.passengerService.get();
    }

    @Get(':id')
    getById(@Param('id') id: string ){
        return this.passengerService.getById( id );
    }

    @Post()
    create(@Body() passengerDTO: PassengerDTO) {

        return this.passengerService.create(passengerDTO);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
        return this.passengerService.put(id, passengerDTO);
    }

    @Delete(':id')
    deletePassenger(@Param('id') id: string ) {
        return this.passengerService.delete(id);
    }
}
