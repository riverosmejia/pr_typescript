import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User"; 

@Entity({ name: "Credentials" })
export class Credential {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 90, unique: false, nullable: false })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @OneToOne(() => User, { nullable: true }) // Hacer que la relación sea opcional
  @JoinColumn()
  user?: User; // Propiedad que representa la relación, puede ser opcional
  
}
