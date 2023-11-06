
import { IsInt, IsString, isString } from "class-validator"

export class PinturasDto {
    @IsString()
    name: string

    @IsString()
    color: string

    @IsString()
    brand: string

    @IsString()
    paintType: string

    
    @IsString()
    img: string
    
    @IsInt()
    price: number

    @IsString()
    colorImg: string
}