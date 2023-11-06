import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinturasModule } from './pinturas/pinturas.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TexturasModule } from './texturas/texturas.module';
import { JwtAuthGuard } from './auth/jwt.strategy';

@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017/modelismo"), 
  ServeStaticModule.forRoot({rootPath: join(__dirname, "..", "client", )}),

  
  PinturasModule, AuthModule, UsersModule, TexturasModule],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
