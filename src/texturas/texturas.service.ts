import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { textura, texturaDocument } from './textura.schema';
import { Model } from 'mongoose';

@Injectable()
export class TexturasService {
    constructor(@InjectModel(textura.name)private texturasModel: Model<texturaDocument>){}

    async getTexturas():Promise <textura[]>{
        return await this.texturasModel.find()
    }

    async getTexturasByBrand(brand: string):Promise <textura[]>{
        return await this.texturasModel.find({brand})
        
    }
    async getTexturasByBrandType(brand: string, textureType:string):Promise <textura[]>{
        return await this.texturasModel.find({brand, textureType})
        
    }


    async checkTexturaByName(name: string): Promise<boolean>{
        const paint = await this.texturasModel.findOne({name: name})
        return !!paint
    }

    async newTextura(body: any): Promise <void>{
        await this.texturasModel.create(body)
    }

    
    async deleteTextura(name: string): Promise<void>{
        await this.texturasModel.deleteOne({name: name})
    }

}
