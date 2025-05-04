import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { HistoryController } from './history.controller'
import { HistoryService } from './history.service'
import { History, HistorySchema } from './history.model'

@Module({
  imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }])],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}