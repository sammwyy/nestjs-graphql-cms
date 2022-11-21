import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Role {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  displayName: string;

  @Field()
  @Prop({ default: '#fff' })
  badgeColor: string;

  @Field(() => [String])
  @Prop({ default: [] })
  permissions: string[];
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);
