import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User"; // Asegúrate de importar User

@Entity({ name: "Credentials" })
export class Credential {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 90, unique: true, nullable: false })
  username: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @OneToOne(() => User, user => user.credential) // Relación inversa
  @JoinColumn()
  user: User;
}
