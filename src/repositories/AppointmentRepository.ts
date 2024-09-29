import { AppDataSource } from "../config/appDataSource";
import { Appointment } from "../entities/Appointment";

const AppoRepository=AppDataSource.getRepository(Appointment);

export default AppoRepository;