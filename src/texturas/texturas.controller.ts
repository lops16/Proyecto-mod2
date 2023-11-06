import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put,Query, Res, UseGuards } from '@nestjs/common';
import { TexturasService } from './texturas.service';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';

@Controller('texturas')
export class TexturasController {
    constructor(private readonly texturasService: TexturasService){}
    @Get()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    getPinturas():any{
        return this.texturasService.getTexturas()
    }

    @Get("/marca/:brand")
    @UseGuards(JwtAuthGuard)
    getTexturasByBrand(@Param("brand") brand: string){

        return this.texturasService.getTexturasByBrand(brand)
    }

    @Get("/marcatextura/:brand/:textureType")
    @UseGuards(JwtAuthGuard)
    getTexturasByBrandType(@Param("brand") brand: string, @Param("textureType") textureType: string){

        return this.texturasService.getTexturasByBrandType(brand, textureType)
    }

    @Post()
    newTextura(@Body() body: any, @Res() res:any): string{
        
        if (body) {
            this.texturasService.newTextura(body)
            return res.status(HttpStatus.CREATED).send("Nueva textura añadida")
            
            
        }else{
            return res.status(HttpStatus.BAD_REQUEST).send("No hay datos")
        }
        
    }


    @Delete()
    async deleteTextura(@Query("name") name: string, @Res() res:any): Promise<any>{
        const exist = await this.texturasService.checkTexturaByName(name)

        if (exist) {
            const deleted = this.texturasService.deleteTextura(name)
            if (deleted) {
                return res.status(HttpStatus.OK).send(`${name} eliminado`)
            }else{
                return res.status(HttpStatus.NOT_FOUND).send("Error al eliminar")
            }
        } else {
            return res.status(HttpStatus.NOT_FOUND).send("Textura no encontrada");
        }
        

    }
}
