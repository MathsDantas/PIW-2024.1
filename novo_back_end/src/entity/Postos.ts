import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bike } from "./Bike";

@Entity()
export class Posto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nameUnidade!: string;

  @Column()
  endereco!: string; // Certifique-se de que isso também esteja definido, se for necessário

  @OneToMany(() => Bike, bike => bike.posto, { cascade: true })  // Verifique se Bike está correto
  bikes!: Bike[];  // Um posto tem várias bikes
}
