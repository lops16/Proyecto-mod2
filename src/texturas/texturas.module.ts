import { Module } from '@nestjs/common';
import { TexturasController } from './texturas.controller';
import { TexturasService } from './texturas.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { TexturaSchema, textura } from './textura.schema';

@Module({
  imports:[MongooseModule.forFeature([

  {  name: textura.name,
    schema: TexturaSchema}

  ])
  ],
  controllers: [TexturasController],
  providers: [TexturasService]
})
export class TexturasModule {}
