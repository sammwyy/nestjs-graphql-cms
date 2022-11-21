import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, IsNotEmpty, Length } from 'class-validator';

@InputType()
export default class CreateRoleDTO {
  @IsNotEmpty()
  @Length(1, 256)
  @Field(() => String)
  displayName: string;

  @IsHexColor()
  @Length(1, 256)
  @Field(() => String)
  badgeColor?: string;

  @Length(1, 256)
  @Field(() => [String])
  permissions?: string[];
}
