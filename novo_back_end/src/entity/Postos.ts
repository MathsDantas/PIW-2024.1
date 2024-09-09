import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"

@Entity()
export class Posto {     //Objeto de Postos de Aluguel

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    nameUnidade!: string

    @Column()
    bikesAdu!: number

    @Column()
    bikesInf!: number
}