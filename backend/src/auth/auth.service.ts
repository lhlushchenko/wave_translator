import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(email: string, password: string, role: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword, role });
    return user.save();
  }

  async initializeUsers() {
    const adminExists = await this.userModel.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      await this.createUser('admin@admin.com', 'adminpassword', 'admin');
    }

    const supportExists = await this.userModel.findOne({ email: 'support@support.com' });
    if (!supportExists) {
      await this.createUser('support@support.com', 'supportpassword', 'support');
    }
  }

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({ email: dto.email, password: hashed, role: dto.role || 'user', });
    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: UserDocument) {
    const payload = { sub: user._id, email: user.email, role: user.role };
    const secret = this.configService.get<string>('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }
}
