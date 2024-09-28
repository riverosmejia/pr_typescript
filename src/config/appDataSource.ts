import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { Credential } from "../entities/Credential";
import { PORT_SERVER, USERNAME, PASSWORD, DATABASE } from "./envs";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(PORT_SERVER),
    username: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    synchronize: true,
    logging: true,
    dropSchema:true,
    entities: [User, Appointment, Credential],
    subscribers: [],
    migrations: [],
});

// Función para obtener el repositorio de una entidad específica
/*export const getRepository = <Entity>(entity: new () => Entity) => {
    return AppDataSource.getRepository(entity);
};*/
