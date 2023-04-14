import { HttpStatus, Injectable } from '@nestjs/common';
import { PassengerDTO } from './DTO/passenger.dto';
import { IPassenger } from 'src/common/interfaces/passenger.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';

@Injectable()
export class PassengerService {

    constructor(@InjectModel(PASSENGER.name) private readonly model:Model<IPassenger>) {}

    // GET
    async get(): Promise<IPassenger[]> {
        return await this.model.find();
    }

    // GET BY ID
    async getById(id: string): Promise<IPassenger> {
        return await this.model.findById(id);
    }

    // POST
    async create( passengerDTO: PassengerDTO ): Promise<IPassenger> {
        const newPassenger = new this.model(passengerDTO);

        return await newPassenger.save();
    }

    // PUT
    async put(id: string, passengerDTO: PassengerDTO ): Promise<IPassenger> {
        return this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
    }

    // DELETE
    async delete( id: string ) {
        await this.model.findByIdAndDelete(id);

        return { status: HttpStatus.OK, message: 'Passenger deleted successfully' };
    }
}
