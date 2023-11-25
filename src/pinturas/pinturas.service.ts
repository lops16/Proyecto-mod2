import { Injectable, ParseIntPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pintura, pinturaDocument } from './pintura.schema';
import { Model } from 'mongoose';
import { query } from 'express';

@Injectable()
export class PinturasService {
    constructor (@InjectModel(pintura.name)private pinturasModel: Model<pinturaDocument>){}

    async getPinturasRandom():Promise <pintura[]>{
        return await this.pinturasModel.find()
    }
    async getPinturas():Promise <pintura[]>{
        return await this.pinturasModel.find()
        
    }
    
    async getPinturasByName(name: string):Promise <pintura[]>{
        return await this.pinturasModel.find({name})
        
    }
    async getPinturasByBrand(brand: string):Promise <pintura[]>{
        return await this.pinturasModel.find({brand})
        
    }
    async getPinturasByBrandColor(brand: string, color:string):Promise <pintura[]>{
        return await this.pinturasModel.find({brand, color})
        
    }

    async checkPinturaByName(name: string): Promise<boolean>{
        const paint = await this.pinturasModel.findOne({name: name})
        return !!paint
    }

    async checkPinturaByType(paintType: string): Promise<boolean>{
        const paint = await this.pinturasModel.findOne({paintType: paintType})
        return !!paint
    }

    async newPintura(body: any): Promise <void>{
        await this.pinturasModel.create(body)
    }

    async updatePintura(paintType: string, price: number): Promise<void>{
        await this.pinturasModel.updateMany({paintType: paintType}, {$set:{price: price}})

    }
    
    async deletePintura(name: string): Promise<void>{
        await this.pinturasModel.deleteOne({name: name})
    }

    async deletePinturaByTypeColor(paintType: string, color: string): Promise<void>{
        await this.pinturasModel.deleteMany({paintType, color})
    }



    
}
