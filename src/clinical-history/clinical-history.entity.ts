import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from '../client/client.entity';

@Entity('clinical_histories')
export class ClinicalHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.clinicalHistories)
    client: Client;

    @Column()
    id_client: string;

    @Column('simple-array')
    av: string[]; 

    @Column('simple-array')
    sc: string[]; 

    @Column('simple-array')
    cc: string[]; 

    @Column('simple-array')
    ae: string[];
} 