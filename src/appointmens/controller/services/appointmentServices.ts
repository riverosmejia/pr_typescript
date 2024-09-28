import { Request, Response } from 'express';
import moment from 'moment';
import  I_Appoinment  from '../../../dto/I_appoinment'; 
import I_AppointmentResponse from '../../../dto/I_appointmentResponse';
import {AppDataSource} from "../../../config/appDataSource";
import { Appointment,AppointmentStatus } from '../../../entities/Appointment';

const Model = (entity: any) => AppDataSource.getRepository(entity);

/*
let appointments: I_Appoinment[] = [
    {
        id: 1,
        userId: 1,
        date: new Date("2024-09-30"),
        time: moment('10:00', 'HH:mm'),
        status: true // Activo
    },
    {
        id: 2,
        userId: 2,
        date: new Date("2024-10-01"),
        time: moment('10:30','HH:mm'),
        status: true // Activo
    }
];
*/

// Obtener el listado de todos los turnos
// Obtener el listado de todos los turnos

export const getAllAppointmentsS = async (): Promise<I_AppointmentResponse[]> => {
    const appointmentRepository = Model(Appointment);

    // Cargar las relaciones con 'user'
    const appointments: Appointment[] = await appointmentRepository.find({
        relations: ['user'], // Incluye la relación con 'user'
    })as Appointment[];

    return appointments.map(app => ({
        id: app.id,
        user: { // Devuelve el objeto user completo
            id: app.user.id,
            name: app.user.name,
            email: app.user.email 
        },
        date: app.date,
        time: app.time, // Mantiene el tiempo como string (importante)
        status: app.status === AppointmentStatus.ACTIVE
    }));
};





export const getAppointmentByIdS = async (id: number): Promise<I_AppointmentResponse | null> => {
    const appointmentRepository = Model(Appointment);

    const appointment = await appointmentRepository.findOne({
        where: { id },
        relations: ['user'], // Cargar la relación con el usuario
    });

    if (appointment) {
        return {
            id: appointment.id,
            date: appointment.date,
            time: appointment.time, // Almacena como string
            user: appointment.user, // ID del usuario relacionado
            status: appointment.status === 'active', // Convierte a booleano
        };
    }

    return null; // Retorna null si no se encuentra la cita
};

// Agendar un nuevo turno
export const scheduleAppointmentS = async (newAppointment: I_Appoinment): Promise<Appointment> => {
    const appointmentRepository = Model(Appointment);

    const appointment = appointmentRepository.create({
        user: { id: newAppointment.userId }, // Relacionar el usuario
        date: newAppointment.date,
        time: newAppointment.time,
        status: 'active',
    });

    const result=await appointmentRepository.save(appointment) as Appointment;

    return result;
};

// Cambiar el estatus de un turno a “cancelled”
export const cancelAppointmentS = async (id: number): Promise<Appointment | null> => {
    const appointmentRepository = Model(Appointment);

    const appointment = await appointmentRepository.findOneBy({ id });

    if (appointment) {
        appointment.status = 'cancelled'; // Cambia el estado a "cancelled"
        const result = await appointmentRepository.save(appointment) as Appointment|null;
        return result;
    }

    return null;
};