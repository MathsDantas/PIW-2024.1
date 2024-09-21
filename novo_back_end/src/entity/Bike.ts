import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Posto } from "./Postos";

@Entity()
export class Bike {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string; // 'adulto' ou 'infantil'

  @ManyToOne(() => User, user => user.bikes, { nullable: true })
  user!: User | null;  // Relaciona com usuário, pode ser null se estiver no posto

  @ManyToOne(() => Posto, posto => posto.bikes, { nullable: true })  // A relação inversa deve estar correta
  posto!: Posto | null;  // Relaciona com o posto, pode ser null se estiver com o usuário
  
  @Column() // Adicione o campo status como coluna
  status!: string; 
}
