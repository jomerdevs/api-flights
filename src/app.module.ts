import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassengerModule } from './passenger/passenger.module';
import { FlightModule } from './flight/flight.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: ['.env.development'],
        isGlobal: true,
      }
    ),
    // configurando conexion a mongodb
    MongooseModule.forRootAsync(
      {
        useFactory: async () => ({ uri: process.env.URI_MONGODB, }),                                     
      },            
    ),    
    UserModule, PassengerModule, FlightModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
