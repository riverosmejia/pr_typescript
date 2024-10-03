import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Moment } from "moment";

/*

    el enum se usa para valores finitos (en este caso, active o cancelled)
    esto es para que no se llegue a usar nada de lo que no se debe usar


*/

export enum AppointmentStatus {
  ACTIVE = "active",
  CANCELLED = "cancelled",
}

@Entity({ name: "Appointments" })
export class Appointment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  date: Date;

  @Column({ type: "time", nullable: false })
  time: string;

  @Column({type:"varchar",nullable:false})
  Asunto:string;

  @ManyToOne(() => User, user => user.appointments, { onDelete: 'CASCADE' }) 
  @JoinColumn() // Aquí está la columna de unión que creará automáticamente userId
  user: User;

  @Column({
    type: "enum",
    enum: AppointmentStatus,
    default: AppointmentStatus.ACTIVE,
    nullable: false
  })
  status: AppointmentStatus;
}
/*
interface I_AppointmentResponse {
    id: number;
    date: Date;
    time: string; // Cambiado a string para la respuesta
    userId: number;
    status: AppointmentStatus;
}
*/
