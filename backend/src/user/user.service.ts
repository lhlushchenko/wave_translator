import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getProfile(userId: string) {
    const user = await this.userModel.findOne({ userId }).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const updates: any = { ...dto };

    if (dto.password) {
      updates.password = await bcrypt.hash(dto.password, 10);
    }

    if (dto.name) {
      updates.name = dto.name; // додано нове поле
    }

    const updated = await this.userModel
      .findOneAndUpdate({ userId }, updates, {
        new: true,
      })
      .select('-password');

    return updated;
  }
}
