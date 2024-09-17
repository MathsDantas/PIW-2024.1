import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {     //Objeto de usuários

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ default: 0 })  // Define o valor padrão como 0 para bicicletas adultas
    BikesAdu!: number;

    @Column({ default: 0 })  // Define o valor padrão como 0 para bicicletas infantis
    BikesInf!: number;

    @ManyToOne(() => Role, role => role.users)
    role!: Role;
}
