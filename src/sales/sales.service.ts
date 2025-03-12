import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sales } from './sales.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sales)
    private readonly salesRepository: Repository<Sales>,
  ) {}

  async findAll(): Promise<Sales[]> {
    return this.salesRepository.find({ relations: ['client', 'glasses'] });
  }

  async findOne(id: number): Promise<Sales> {
    const sale = await this.salesRepository.findOne({ where: { id }, relations: ['client', 'glasses'] });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async create(sale: Partial<Sales>): Promise<Sales> {
    const newSale = this.salesRepository.create(sale);
    return this.salesRepository.save(newSale);
  }

  async update(id: number, updateData: Partial<Sales>): Promise<Sales> {
    const sale = await this.findOne(id);
    Object.assign(sale, updateData);
    return this.salesRepository.save(sale);
  }

  async delete(id: number): Promise<void> {
    const result = await this.salesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
  }
}