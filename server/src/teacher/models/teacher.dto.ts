import { IsNotEmpty, IsString, Length } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class TeacherDTO {
  @IsNotEmpty()
  @IsString()
  @Length(4)
  @ApiProperty()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  occupation: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
	image: string
}