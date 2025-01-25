import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(0)
  @Type(() => Number)
  price: number;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  stock: number;

  image: string;
}
