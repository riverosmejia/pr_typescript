import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Credential } from "./Credential"; // Asegúrate de importar Credential

@Entity({ name: "users" })
export class User {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 90, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @Column({ type: 'bigint', unique: true, nullable: false })
  nDni: number;

  @Column({ type: 'varchar', length: 50, nullable: false, default: 'user' })
  role: string;

  @OneToOne(() => Credential, { cascade: true }) // Agregamos la relación uno a uno
  @JoinColumn() // Especifica que esta es la columna de unión
  credential: Credential; // Propiedad que representa la relación

  @OneToMany(() => Appointment, appointment => appointment.user)
  appointments: Appointment[];
}
