import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export interface User extends Document {
  userId: string;
  email: string;
  password: string;
  role: string;
  name: string; // додано нове поле
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' }) // user, admin, support
  role: string;

  @Prop({ required: true, unique: true })
  userId: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
