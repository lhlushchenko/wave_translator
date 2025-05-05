import { Controller, Get, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/user.decorator';
import { User } from '../schemas/user.schema';

@Controller('user/history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  // Отримати історію перекладів
  @UseGuards(JwtAuthGuard)
  @Get()
  getHistory(@CurrentUser() user: User) {
    return this.historyService.getUserHistory(user.userId);
  }
}
