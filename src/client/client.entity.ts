import { Entity, Column, PrimaryColumn} from 'typeorm';

@Entity()
export class Client {
    @PrimaryColumn()
    id: number;

    @Column({ length: 50, nullable: false})
    name: string;

    @Column({ length: 50, nullable: false})
    lastname: string;

    @Column({ length: 255, nullable: false, unique: true})
    email: string;

    @Column({ length: 15, nullable: false, unique: true})
    phone: string;
}