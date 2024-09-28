import { AppDataSource } from "../config/appDataSource";
import { User } from "../entities/User"; // Importa la entidad User
import { Appointment } from "../entities/Appointment"; // Importa la entidad Appointment
import {Credential} from "../entities/Credential"
import moment from "moment";

const Model = (entity: any) => AppDataSource.getRepository(entity);

const users = [
    {
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "password": "hashedpassword1",
        "birthdate": new Date("1990-01-15"),
        "nDni": 12345678,
        "role": "user"
    },
    {
        "name": "María García",
        "email": "maria.garcia@example.com",
        "password": "hashedpassword2",
        "birthdate": new Date("1985-03-20"),
        "nDni": 23456789,
        "role": "user"
    },
    {
        "name": "Carlos López",
        "email": "carlos.lopez@example.com",
        "password": "hashedpassword3",
        "birthdate": new Date("1992-07-25"),
        "nDni": 34567890,
        "role": "user"
    },
    {
        "name": "Ana Torres",
        "email": "ana.torres@example.com",
        "password": "hashedpassword4",
        "birthdate": new Date("1995-11-10"),
        "nDni": 45678901,
        "role": "user"
    }
];

const appointments = [
    {
        "userId": 1,
        "date": new Date("2024-09-30"),
        "time": moment("10:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 1,
        "date": new Date("2024-10-05"),
        "time": moment("11:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 2,
        "date": new Date("2024-10-01"),
        "time": moment("10:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 2,
        "date": new Date("2024-10-08"),
        "time": moment("12:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 3,
        "date": new Date("2024-10-02"),
        "time": moment("09:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 3,
        "date": new Date("2024-10-09"),
        "time": moment("14:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 4,
        "date": new Date("2024-10-03"),
        "time": moment("08:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    },
    {
        "userId": 4,
        "date": new Date("2024-10-10"),
        "time": moment("15:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active"
    }
];

export const PreLoadData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        let usersList = [];

        for (let i = 0; i < users.length; i++) {
            // Crear la credencial para cada usuario
            const credential = await Model(Credential).create({
                username: users[i].email, // Asigna el correo como nombre de usuario
                password: users[i].password // Asigna la contraseña
            });

            // Guarda la credencial
            await transactionalEntityManager.save(credential);

            // Crea el usuario y asigna la credencial
            const user = await Model(User).create({
                ...users[i], // Copia el resto de los datos del usuario
                credential: credential // Asigna la credencial recién creada
            });

            // Guarda el usuario
            await transactionalEntityManager.save(user);

            // Agrega el usuario a la lista
            usersList.push(user);
        }

        let appointmentsList = [];

        for (let j = 0; j < appointments.length; j++) {
            // Busca el usuario correspondiente usando el userId del appointment
            const user = usersList[appointments[j].userId - 1]; // Ajusta el índice

            // Crea la cita y asigna el usuario
            const appointment = await Model(Appointment).create({
                ...appointments[j], // Copia los demás datos de la cita
                user: user // Asigna el usuario relacionado
            });

            // Guarda la cita
            await transactionalEntityManager.save(appointment);
            appointmentsList.push(appointment);
        }

        console.log("Datos precargados exitosamente con credenciales y citas");
    });
};


