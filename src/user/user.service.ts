import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/common/interfaces/user.interface';
import { USER } from 'src/common/models/models';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './DTO/user.dto';

@Injectable()
export class UserService {

    constructor(@InjectModel(USER.name) private readonly model:Model<IUser> ) {}

    async hashPassword( password: string ): Promise<string> {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(password, salt);
    }

    async checkPassword(password: string, passwordDB: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordDB);
    }

    async findByUsername(username: string): Promise<IUser> {
        return await this.model.findOne({ username });
    }

    async getAll(): Promise<IUser[]> {
        
        return await this.model.find();
    }

    async getById(id: string): Promise<IUser> {

        return await this.model.findById(id);
    }

    async create( userDTO: UserDTO ): Promise<IUser> {

        const hash = await this.hashPassword(userDTO.password);
        const newUser = new this.model({...userDTO, password: hash });

        // guardamos el usuario en la base de datos
        return await newUser.save();
    }

    async update(id: string, userDTO: UserDTO): Promise<IUser> {
        const hash = await this.hashPassword(userDTO.password);
        const user = {...userDTO, password: hash }

        return await this.model.findByIdAndUpdate(id, user, { new: true });
    }

    async delete(id: string) {
        await this.model.findByIdAndDelete(id);

        return { status: HttpStatus.OK, message: 'Deleted' };
    }

    
}
