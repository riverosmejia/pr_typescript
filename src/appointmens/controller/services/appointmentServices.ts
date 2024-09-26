import { Request, Response } from 'express';
import  I_Appoinment  from '../../../dto/I_appoinment'; 

let appointments: I_Appoinment[] = [
    {
        id: 1,
        userId: 1,
        date: new Date("2024-09-30"),
        time: "10:00",
        status: true // Activo
    },
    {
        id: 2,
        userId: 2,
        date: new Date("2024-10-01"),
        time: "14:30",
        status: true // Activo
    }
];


// Obtener el listado de todos los turnos
export const getAllAppointmentsS = async (): Promise<I_Appoinment[]> => {
    return appointments;
};

// Obtener el detalle de un turno específico
export const getAppointmentByIdS = async (id: number): Promise<I_Appoinment | null> => {
    const appointment = appointments.find(app => app.id === id);
    return appointment || null; // Retorna el turno o null si no se encuentra
};

// Agendar un nuevo turno
export const scheduleAppointmentS = async (newAppointment: I_Appoinment): Promise<I_Appoinment> => {
    newAppointment.id = appointments.length + 1; // Asignar un nuevo ID
    newAppointment.status = true; // Por defecto, el estado es "active"
    appointments.push(newAppointment); // Agregar el nuevo turno
    return newAppointment; // Devuelve el turno creado
};

// Cambiar el estatus de un turno a “cancelled”
export const cancelAppointmentS = async (id: number): Promise<I_Appoinment | null> => {

    console.log(id);
    const appointment = appointments.find(app => app.id === id);

    if (appointment) {
        appointment.status = false; // Cambiar el estado a "cancelled"
        return appointment; // Devuelve el turno actualizado
    }
    
    return null; // Retorna null si no se encuentra el turno
};