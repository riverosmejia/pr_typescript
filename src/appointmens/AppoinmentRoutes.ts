import { Router } from 'express';
import { getAllAppointments, getAppointmentById, scheduleAppointment, cancelAppointment,getAppointmentByIdUser } from './controller/appointmentController';

const appointmentRouter = Router();

appointmentRouter.get('/appointments', getAllAppointments);
appointmentRouter.get('/appointment/:id', getAppointmentById);
appointmentRouter.post('/appointments/schedule', scheduleAppointment);
appointmentRouter.put('/appointments/cancel/:id', cancelAppointment);
appointmentRouter.get('/appointments/user/:id', getAppointmentByIdUser);

export default appointmentRouter;
