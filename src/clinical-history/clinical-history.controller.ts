import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClinicalHistoryService } from './clinical-history.service';
import { ClinicalHistory } from './clinical-history.entity';
import { CreateClinicalHistoryDto } from './dto/create-clinical-history.dto';

@Controller('clinical-histories')
export class ClinicalHistoryController {
    constructor(private readonly clinicalHistoryService: ClinicalHistoryService) {}

    @Get()
    findAll(): Promise<ClinicalHistory[]> {
        return this.clinicalHistoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.clinicalHistoryService.findOneById(id);
    }

    @Post()
    create(@Body() historyData: CreateClinicalHistoryDto) {
        return this.clinicalHistoryService.create(historyData);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() historyData: Partial<ClinicalHistory>){
        return this.clinicalHistoryService.update(id, historyData);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.clinicalHistoryService.remove(id);
    }
} 