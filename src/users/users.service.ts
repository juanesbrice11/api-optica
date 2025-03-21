import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user || undefined;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async create(userData: User): Promise<User> {
        const user = this.userRepository.create(userData);
        return await this.userRepository.save(user);
    }

    async findOneById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}
