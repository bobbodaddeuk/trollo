import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(user: User) {
    const { id } = user;
    const uuser = await this.userRepository.findOneBy({ id });

    if (!uuser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return uuser;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const uuser = await this.userRepository.findOneBy({ id });
    if (!uuser) {
      throw new Error('Authentication information is missing');
    }

    const { name, role } = updateUserDto;
    return await this.userRepository.save({ id, name, role });
  }

  async deleteUser(id: number, password: string) {
    const uuser = await this.userRepository.findOne({
      select: ['password'],
      where: { id },
    });
    if (!uuser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    const isPasswordMatched = bcrypt.compareSync(password, uuser.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    await this.userRepository.delete({ id });
  }
}
