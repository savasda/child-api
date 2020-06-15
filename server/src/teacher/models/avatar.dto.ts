import { IsNotEmpty, IsArray,  } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AvatarDTO {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  programsIds: Array<string>
}