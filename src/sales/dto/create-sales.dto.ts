import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateSalesDto {
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  total: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  product_image: string;
}