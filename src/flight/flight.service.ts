import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { FLIGHT } from 'src/common/models/models';
import { FlightDTO } from './DTO/flight.dto';

@Injectable()
export class FlightService {

    constructor(@InjectModel(FLIGHT.name) private readonly model: Model<IFlight>){}

    async getAll(): Promise<IFlight[]> {
        return await this.model.find().populate('passengers');
    }

    async getById(id: string): Promise<IFlight> {
        return await this.model.findById(id).populate('passengers');
    }

    async create( flightDTO: FlightDTO): Promise<IFlight> {
        const newFlight = new this.model(flightDTO);

        return await newFlight.save();
    }

    async update( id: string, flightDTO: FlightDTO ): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(id, flightDTO, { new: true})
    }

    async delete( id: string ) {
        await this.model.findByIdAndDelete(id);
        return {
            status: HttpStatus.OK,
            message: 'flight deleted successfully'
        }
    }

    async addPassenger(flightId: string, passengerId: string ): Promise<IFlight> {
        return await this.model.findByIdAndUpdate(flightId, {
            // $addToSet para que si ese id ya existe no lo intente agregar de nuevo
            $addToSet: { passengers: passengerId}}, 
            {new: true }).populate('passengers');
    }
}
