import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';

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
    console.log('===========');
    console.log(id);
    console.log('===========');
    const uuser = await this.userRepository.findOneBy({ id });
    if (!uuser) {
      throw new Error('Authentication information is missing');
    }

    const { name } = updateUserDto;
    return await this.userRepository.save({ id, name });
  }
}
