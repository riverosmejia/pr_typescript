import { AppDataSource } from "../config/appDataSource";
import { User } from "../entities/User";

const userRepository=AppDataSource.getRepository(User);

export default userRepository