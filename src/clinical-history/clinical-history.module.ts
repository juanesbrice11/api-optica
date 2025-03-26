import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicalHistory } from './clinical-history.entity';
import { ClinicalHistoryService } from './clinical-history.service';
import { ClinicalHistoryController } from './clinical-history.controller';
import { Client } from '../client/client.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClinicalHistory, Client]),
    ],
    providers: [ClinicalHistoryService],
    controllers: [ClinicalHistoryController],
})
export class ClinicalHistoryModule {} 