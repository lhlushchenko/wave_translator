import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/user.decorator';
import { TranslateDto } from './dto/translate.dto';
import { TranslationService } from './translation.service';
import { User } from '../schemas/user.schema';

@Controller('translations')
@UseGuards(JwtAuthGuard)
export class TranslationController {
  constructor(private readonly translationService: TranslationService) {}

  @Post()
  translate(@Body() dto: TranslateDto, @CurrentUser() user: User) {
    return this.translationService.translate(
      dto.text,
      dto.targetLang,
      user.userId,
    );
  }

  @Get()
  history(@CurrentUser() user: User) {
    return this.translationService.getHistory(user.userId);
  }
}
