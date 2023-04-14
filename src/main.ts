import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/httpException.filter';
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import { config } from './configs/apiConfig';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // customs middlewares
  app.useGlobalFilters( new AllExceptionFilter());
  app.useGlobalInterceptors( new TimeOutInterceptor());
  app.useGlobalPipes( new ValidationPipe()); 
  
  mongoose.connect(process.env.URI_MONGODB).then(
    () => { console.log('💾 Database connected 💾') },
    err => { console.log(err) }
  );

  const options = new DocumentBuilder()
    .setTitle('Flights API')
    .setDescription('Scheduled Flights App')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup(config.SWAGGER_ROUTE, app, document, {
    swaggerOptions: {
      filter: true,
    }
  });
  
  await app.listen(config.API_PORT, () => {
    console.log(`🚀 Server running on port: ${config.API_PORT} 🚀`);
    console.log(`📑 Swagger API docs: ${config.SWAGGER_FULL_ROUTE} 📑`);
  });
}
bootstrap();
