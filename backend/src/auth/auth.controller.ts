import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      throw new HttpException(
        'Registration failed: ' + error.message,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { access_token } = await this.authService.login(loginDto);
      return { access_token };
    } catch (error) {
      throw new HttpException(
        'Login failed: ' + error.message,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
