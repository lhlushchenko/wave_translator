import { Module } from '@nestjs/common';
import { TranslationService } from './translation.service';
import { TranslationController } from './translation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Translation, TranslationSchema } from '../schemas/translation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Translation.name, schema: TranslationSchema }]),
  ],
  controllers: [TranslationController],
  providers: [TranslationService],
})
export class TranslationModule {}
