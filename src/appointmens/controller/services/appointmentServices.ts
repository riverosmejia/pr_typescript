import moment from 'moment';
import  I_Appoinment  from '../../../dto/I_appoinment'; 
import I_AppointmentResponse from '../../../dto/I_appointmentResponse';
import { Appointment,AppointmentStatus } from '../../../entities/Appointment';
import appointmentRepository from '../../../repositories/AppointmentRepository';

export const getAllAppointmentsS = async (): Promise<I_AppointmentResponse[]> => {

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
export const scheduleAppointmentS = async (newAppointment: I_Appoinment): Promise<Appointment|string> => {

    // Verifica que el tiempo sea válido y formatea
    const formattedTime = moment(newAppointment.time, 'HH:mm', true); // true para modo estricto
    if (!formattedTime.isValid()) {
        return 'El formato de la hora no es válido. Debe ser HH:mm.';
    }

    const appointment = appointmentRepository.create({
        user: { id: newAppointment.userId }, // Relacionar el usuario
        date: newAppointment.date,
        time: formattedTime.format('HH:mm'), // Formatea el tiempo correctamente
        status: AppointmentStatus.ACTIVE,
    });

    const result = await appointmentRepository.save(appointment) as Appointment;

    return result;
};

// Cambiar el estatus de un turno a “cancelled”
export const cancelAppointmentS = async (id: number): Promise<Appointment | null> => {

    const appointment:Appointment = await appointmentRepository.findOneBy({ id }) as Appointment;

    if (appointment) {
        appointment.status=AppointmentStatus.CANCELLED; // Cambia el estado a "cancelled"
        const result = await appointmentRepository.save(appointment) as Appointment|null;
        return result;
    }

    return null;
};