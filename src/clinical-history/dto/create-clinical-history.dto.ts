import { IsArray, IsNotEmpty, IsString, Validate } from 'class-validator';
import {Vision} from './vision.dto'

export class CreateClinicalHistoryDto {
    @IsString()
    id_client: string;

    @IsArray()
    @IsNotEmpty()
    @Validate(Vision)
    av: string[];

    @IsArray()
    @IsNotEmpty()
    @Validate(Vision)
    sc: string[];

    @IsArray()
    @IsNotEmpty()
    @Validate(Vision)
    cc: string[];

    @IsArray()
    @IsNotEmpty()
    @Validate(Vision)
    ae: string[];
} 