import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Translation, TranslationDocument } from '../schemas/translation.schema';

@Injectable()
export class TranslationService {
  private translator: Translate;

  constructor(
    @InjectModel(Translation.name)
    private translationModel: Model<TranslationDocument>,
  ) {
    this.translator = new Translate({ key: process.env.GOOGLE_API_KEY });
  }

  async translate(text: string, targetLang: string, userId: string) {
    const [translatedText] = await this.translator.translate(text, targetLang);

    const saved = await this.translationModel.create({
      text,
      translatedText,
      targetLang,
      userId,
    });

    return saved;
  }

  async getHistory(userId: string) {
    return this.translationModel.find({ userId }).sort({ createdAt: -1 });
  }
}
