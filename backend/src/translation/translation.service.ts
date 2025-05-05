import { Injectable } from '@nestjs/common';
import { Translate } from '@google-cloud/translate/build/src/v2';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Translation,
  TranslationDocument,
} from '../schemas/translation.schema';
import { HistoryService } from '../history/history.service';

@Injectable()
export class TranslationService {
  private translator: Translate;

  constructor(
    @InjectModel(Translation.name)
    private translationModel: Model<TranslationDocument>,
    private readonly historyService: HistoryService,
  ) {
    this.translator = new Translate({ key: process.env.GOOGLE_API_KEY });
  }

  async translate(text: string, targetLang: string, userId: string) {
    // Визначаємо мову тексту
    const [detection] = await this.translator.detect(text);
    const sourceLanguage = Array.isArray(detection)
      ? detection[0].language
      : detection.language;

    const [translatedText] = await this.translator.translate(text, targetLang);

    const saved = await this.translationModel.create({
      text,
      translatedText,
      targetLang,
      userId,
    });

    // Додати запис до історії
    await this.historyService.addTranslationToHistory(
      userId,
      sourceLanguage,
      targetLang,
      text,
      translatedText,
    );

    return saved;
  }

  async getHistory(userId: string) {
    return this.translationModel.find({ userId }).sort({ createdAt: -1 });
  }
}
