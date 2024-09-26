import { Router } from 'express';
import { getAllAppointments, getAppointmentById, scheduleAppointment, cancelAppointment } from './controller/appointmentController';

const appointmentRouter = Router();

appointmentRouter.get('/appointments', getAllAppointments);
appointmentRouter.get('/appointments/:id', getAppointmentById);
appointmentRouter.post('/appointments/schedule', scheduleAppointment);
appointmentRouter.put('/appointments/cancel', cancelAppointment);

export default appointmentRouter;
