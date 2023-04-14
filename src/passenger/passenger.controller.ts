import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PassengerDTO } from './DTO/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('passengers') // swagger doc tag
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
