import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; import { Document } from "mongoose"
export type texturaDocument = textura & Document
@Schema()
export class textura {

    @Prop()
    name: string

    @Prop()
    brand: string

    @Prop()
    texturType: string

    @Prop()
    img: string

    @Prop()
    size: number
    
    @Prop()
    price: number

    

}
export const TexturaSchema = SchemaFactory.createForClass(textura)