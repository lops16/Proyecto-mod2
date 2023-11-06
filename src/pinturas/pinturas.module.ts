import { Module } from '@nestjs/common';
import { PinturasController } from './pinturas.controller';
import { PinturasService } from './pinturas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { pintura, PinturaSchema } from './pintura.schema';


@Module({
  imports:[MongooseModule.forFeature([
    {
      name: pintura.name,
      schema: PinturaSchema
    }
  ])],
  controllers: [PinturasController],
  providers: [PinturasService]
})
export class PinturasModule {}
