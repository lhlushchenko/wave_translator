import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { History } from './history.model'

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<History>,
  ) {}

  // Додати запис до історії перекладів
  async addTranslationToHistory(
    userId: string,
    sourceLanguage: string,
    targetLanguage: string,
    originalText: string,
    translatedText: string,
  ) {
    const newHistory = new this.historyModel({
      userId,
      sourceLanguage,
      targetLanguage,
      originalText,
      translatedText,
      date: new Date(),
    })
    return newHistory.save()
  }

  // Отримати історію перекладів для конкретного користувача
  async getUserHistory(userId: string) {
    return this.historyModel.find({ userId }).sort({ date: -1 })
  }
}