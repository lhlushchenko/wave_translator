import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class History extends Document {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  sourceLanguage: string

  @Prop({ required: true })
  targetLanguage: string

  @Prop({ required: true })
  originalText: string

  @Prop({ required: true })
  translatedText: string

  @Prop({ required: true })
  date: Date
}

export const HistorySchema = SchemaFactory.createForClass(History)