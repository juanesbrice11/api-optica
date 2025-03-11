import { Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: string;

    @Column({ length: 255, nullable: false})
    email: string;

    @Column({ length: 255, nullable: false})
    password: string;
}