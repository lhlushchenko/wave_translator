import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { HistoryService } from './history.service'
import { JwtAuthGuard } from '../auth/jwt.guard'
import { CurrentUser } from '../auth/user.decorator'

@Controller('user/history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  // Отримати історію перекладів
  @UseGuards(JwtAuthGuard)
  @Get()
  getHistory(@CurrentUser() user: any) {
    return this.historyService.getUserHistory(user.id)
  }
}