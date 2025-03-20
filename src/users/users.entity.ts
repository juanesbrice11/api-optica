import { Role } from "src/auth/dto/auth.dto";
import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ length: 255, nullable: false})
    name: string;

    @Column({ length: 255, nullable: false})
    email: string;

    @Column({ length: 255, nullable: false})
    password: string;

    @Column({type: 'enum', enum: Role, default: Role.SECRETARY})
    role: Role;
}