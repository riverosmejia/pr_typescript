import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";

const appointmentRepository=AppDataSource.getRepository(Appointment);

export default appointmentRepository;