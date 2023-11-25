import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; import { Document } from "mongoose"
export type pinturaDocument = pintura & Document
@Schema()
export class pintura {

    @Prop()
    name: string

    @Prop()
    color: string

    @Prop()
    brand: string

    @Prop()
    paintType: string

    
    @Prop()
    img: string
    
    @Prop()
    price: number

    @Prop()
    colorDisplay: string

}
export const PinturaSchema = SchemaFactory.createForClass(pintura)