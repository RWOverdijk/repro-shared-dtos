import 'reflect-metadata';

import {
  Contains,
  IsDate,
  IsEmail,
  IsEnum,
  IsFQDN,
  IsInt,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';

enum Cheese {
  Gouda = 'gouda',
  Brie = 'brie',
  Cheddar = 'cheddar',
}

export class ExampleDto {
  @Length(10, 20)
  title!: string;

  @Contains('hello')
  @IsOptional()
  text?: string;

  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  rating?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  /**
   * Example description.
   *
   * @example gouda
   */
  @IsEnum(Cheese)
  cheese?: Cheese;

  @IsFQDN()
  @IsOptional()
  site?: string;

  @IsDate()
  @IsOptional()
  createDate?: Date;
}
