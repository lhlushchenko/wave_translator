import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('admin')
  @Roles('admin') // тільки для адміністраторів
  @UseGuards(RolesGuard)
  getAdmin() {
    return 'This is an admin page.'
  }

  @Get('support')
  @Roles('support') // тільки для технічної підтримки
  @UseGuards(RolesGuard)
  getSupport() {
    return 'This is a support page.'
  }

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.userService.getProfile(user.userId);
  }

  @Patch('profile')
  updateProfile(@CurrentUser() user: any, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(user.userId, dto);
  }
}
