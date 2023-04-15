import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './DTO/flight.dto';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { PassengerService } from 'src/passenger/passenger.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('flights') // swagger doc tag
@ApiBearerAuth() // swagger authorization
@UseGuards(JwtAuthGuard) // jwt authorization para acceso a endpoints
@Controller('api/v1/flight')
export class FlightController {

    constructor( private readonly flightService: FlightService,
        private readonly passengerService: PassengerService ){}

    @Get()
    getAll() {
        return this.flightService.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: string) {
        return this.flightService.getById(id);
    }

    @Post()
    create(@Body() flightDTO: FlightDTO ): Promise<IFlight> {
        return this.flightService.create(flightDTO);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
        return this.flightService.update(id, flightDTO);
    }

    @Delete(':id')
    deleteFlight(@Param('id') id: string) {
        return this.flightService.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    async addPassenger(@Param('flightId') flightId: string, @Param('passengerId') passengerId: string ) {
        const passenger = await this.passengerService.getById(passengerId);

        if (!passenger) throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);

        return this.flightService.addPassenger(flightId, passengerId);
    }
}
