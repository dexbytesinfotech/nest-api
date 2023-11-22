import {
    IsNotEmpty,
    IsString,
    MinLength,
    IsAlpha,
    Matches,
    IsEnum,
  } from 'class-validator';
  
  
  
  export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    @IsAlpha()
    @MinLength(1)
    readonly title: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    readonly isbn: string;

  }