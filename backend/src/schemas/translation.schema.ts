import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TranslationDocument = Translation & Document;

@Schema({ timestamps: true })
export class Translation {
  @Prop()
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  translatedText: string;

  @Prop({ required: true })
  sourceLang: string;

  @Prop({ required: true })
  targetLang: string;
}

export const TranslationSchema = SchemaFactory.createForClass(Translation);
