import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalHistory } from './clinical-history.entity';
import { Repository } from 'typeorm';
import { CreateClinicalHistoryDto } from './dto/create-clinical-history.dto';

@Injectable()
export class ClinicalHistoryService {
    constructor(
        @InjectRepository(ClinicalHistory)
        private clinicalHistoryRepository: Repository<ClinicalHistory>
    ) {}

    async findAll(): Promise<ClinicalHistory[]> {
        return await this.clinicalHistoryRepository.find();
    }

    async findOneById(id: number): Promise<ClinicalHistory> {
        const history = await this.clinicalHistoryRepository.findOne({ where: { id } });
        if (!history) {
            throw new NotFoundException(`Clinical history with ID ${id} not found`);
        }
        return history;
    }

    async create(historyData: CreateClinicalHistoryDto) {
        const history = this.clinicalHistoryRepository.create(historyData);
        return await this.clinicalHistoryRepository.save(history);
    }

    async update(id: number, historyData: Partial<ClinicalHistory>): Promise<ClinicalHistory> {
        await this.findOneById(id);
        await this.clinicalHistoryRepository.update(id, historyData);
        return this.findOneById(id); 
    }

    async remove(id: number): Promise<void> {
        await this.findOneById(id); 
        await this.clinicalHistoryRepository.delete(id);
    }
} 