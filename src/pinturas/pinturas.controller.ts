import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { PinturasService } from './pinturas.service';
import { PinturasDto } from './dto/pinturas.dto/pinturas.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('pinturas')
export class PinturasController {
    constructor(private readonly pinturasService: PinturasService){}
    @Get()
    /* @UseGuards(JwtAuthGuard) */
    getPinturasRandom():any{
        return this.pinturasService.getPinturas()
    }
    @Get("/all")
    @UseGuards(JwtAuthGuard)
    getPinturas():any{
        return this.pinturasService.getPinturas()
    }
    
    @Get("/name")
    @UseGuards(JwtAuthGuard)
    getPinturasByName(@Param("name") name: string){

        return this.pinturasService.getPinturasByName(name)
    }
    @Get("/marca/:brand")
    @UseGuards(JwtAuthGuard)
    getPinturasByBrand(@Param("brand") brand: string){

        return this.pinturasService.getPinturasByBrand(brand)
    }

    @Get("/marcaycolor/:brand/:color")
    @UseGuards(JwtAuthGuard)
    getPinturasByBrandColor(@Param("brand") brand: string, @Param("color") color: string){

        return this.pinturasService.getPinturasByBrandColor(brand, color)
    }
    
    @Post('/new')
@UseGuards(JwtAuthGuard)
newPintura(@Body() body: PinturasDto, @Res() res: any): Promise<void> {
    if (body) {
        const newPaint = this.pinturasService.newPintura(body)
        return res.status(HttpStatus.CREATED).send(newPaint)
        
        
    }else{
        return res.status(HttpStatus.BAD_REQUEST).send("No hay datos")
    }
}

    @Put()
    async upadatePintura(@Query("paintType") paintType: string, @Query("price") price: number, @Res() res:any):Promise<any>{

        if (isNaN(price)) {
            return res.status(HttpStatus.BAD_REQUEST).send("Invalid price, numeric value expected")
        }
        const paintExist = await this.pinturasService.checkPinturaByType(paintType)
        if (paintExist) {
            const success = this.pinturasService.updatePintura(paintType, price)

            if (success) {
            return res.status(HttpStatus.OK).send("Precio modificado")
            }else{ return res.status(HttpStatus.NOT_FOUND).send("Error al modificar")}

        }else{ return res.status(HttpStatus.NOT_FOUND).send("Gama de pintura no encontrada");}
        
        
    }

    @Delete()
    async deletePintura(@Query("name") name: string, @Res() res:any): Promise<any>{
        const exist = await this.pinturasService.checkPinturaByName(name)

        if (exist) {
            const deleted = this.pinturasService.deletePintura(name)
            if (deleted) {
                return res.status(HttpStatus.OK).send(`${name} eliminado`)
            }else{
                return res.status(HttpStatus.NOT_FOUND).send("Error al eliminar")
            }
        } else {
            return res.status(HttpStatus.NOT_FOUND).send("Pintura no encontrada");
        }
        

    }

    @Delete("/tipoycolor")
    async deletePinturaByTypeColor(@Query("paintType") paintType: string, @Query("color") color: string, @Res() res:any ): Promise<any>{
        const exist = await this.pinturasService.checkPinturaByType(paintType)
        if (exist) {
            const deleted = this.pinturasService.deletePinturaByTypeColor(paintType, color)
            if (deleted) {
                return res.status(HttpStatus.OK).send(`Los colores ${color} de la gama ${paintType} han sido eliminados`)
            }else{
                return res.status(HttpStatus.NOT_FOUND).send("Error al eliminar")
            }
            
        } else{
            return res.status(HttpStatus.NOT_FOUND).send("Gama de pintura no encontrada");
        }
        

    }


}
