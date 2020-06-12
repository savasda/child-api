import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ProgramDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  caption: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  image: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  duration: number
}

