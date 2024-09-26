import { Request, Response } from 'express';
import { getAllAppointmentsS, getAppointmentByIdS, scheduleAppointmentS, cancelAppointmentS } from '../controller/services/appointmentServices'; // Asegúrate de que la ruta sea correcta
import I_Appoinment from '../../dto/I_appoinment';

export const getAllAppointments = async (req: Request, res: Response) => {

    const appointments = await getAllAppointmentsS();
    res.status(200).json(appointments);

};

export const getAppointmentById = async (req: Request, res: Response) => {
    
    const { id } = req.params;
    const appointment = await getAppointmentByIdS(Number(id));

    if (appointment) {
        res.status(200).json(appointment);
    } else {
        res.status(404).json({ message: 'Turno no encontrado' });
    }

};

export const scheduleAppointment = async (req: Request, res: Response) => {
    
    const newAppointment: I_Appoinment = req.body; // Asegúrate de que el cuerpo tenga el formato correcto
    const createdAppointment = await scheduleAppointmentS(newAppointment);

    res.status(201).json(createdAppointment);

};

export const cancelAppointment = async (req: Request, res: Response) => {

    const { id } = req.body;
    const Id =parseInt(id);
    const canceledAppointment = await cancelAppointmentS(Id);

    if (canceledAppointment) {
    
        res.status(200).json(canceledAppointment);
    } else {
    
        res.status(404).json({ message: 'Turno no encontrado' });
    }
};
