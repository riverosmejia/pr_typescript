import { AppDataSource } from "../config/appDataSource";
import { Credential } from "../entities/Credential";

const credentialRepository=AppDataSource.getRepository(Credential);

export default credentialRepository;