import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Glasses } from './entities/glasses.entity';
import { CreateGlassesDto } from './dto/create-glasses.dto';
import { UpdateGlassesDto } from './dto/update-glasses.dto';

@Injectable()
export class GlassesService {
  constructor(
    @InjectRepository(Glasses)
    private glassesRepository: Repository<Glasses>,
  ) {}

  async create(createGlassesDto: CreateGlassesDto): Promise<Glasses> {
    const glasses = this.glassesRepository.create(createGlassesDto);
    return await this.glassesRepository.save(glasses);
  }

  async findAll(): Promise<Glasses[]> {
    return await this.glassesRepository.find();
  }

  async findOne(id: number): Promise<Glasses> {
    const glasses = await this.glassesRepository.findOne({ where: { id } });
    if (!glasses) {
      throw new NotFoundException(`Glasses with ID ${id} not found`);
    }
    return glasses;
  }

  async update(id: number, updateGlassesDto: UpdateGlassesDto): Promise<Glasses> {
    const glasses = await this.findOne(id);
    Object.assign(glasses, updateGlassesDto);
    return await this.glassesRepository.save(glasses);
  }

  async remove(id: number): Promise<void> {
    const result = await this.glassesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Glasses with ID ${id} not found`);
    }
  }
} 