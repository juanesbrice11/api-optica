import { PartialType } from '@nestjs/mapped-types';
import { CreateGlassesDto } from './create-glasses.dto';

export class UpdateGlassesDto extends PartialType(CreateGlassesDto) {} 