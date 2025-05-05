import { Injectable, BadRequestException } from '@nestjs/common';
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

  async translate(
    text: string,
    sourceLang: string,
    targetLang: string,
    userId?: string,
  ) {
    // const [detection] = await this.translator.detect(text);
    // const detectedLanguage = detection.language;
    //
    // // Якщо мова не відповідає sourceLang, повертаємо помилку
    // if (detectedLanguage !== sourceLang) {
    //   throw new BadRequestException({
    //     message: `Виявлена мова "${detectedLanguage}" не відповідає очікуваній вихідній мові "${sourceLang}"`,
    //     detectedLanguage,
    //     sourceLang,
    //   });
    // }

    const [translatedText] = await this.translator.translate(text, {
      from: sourceLang,
      to: targetLang,
    });

    const saved = await this.translationModel.create({
      text,
      translatedText,
      sourceLang,
      targetLang,
      userId,
    });

    if (userId) {
      // Додати запис до історії
      await this.historyService.addTranslationToHistory(
        userId,
        sourceLang,
        targetLang,
        text,
        translatedText,
      );
    }

    return saved;
  }

  async getHistory(userId: string) {
    return this.translationModel.find({ userId }).sort({ createdAt: -1 });
  }
}
