import { AppDataSource,getRepository } from "../config/appDataSource";
import { User } from "../entities/User"; // Importa la entidad User
import { Appointment } from "../entities/Appointment"; // Importa la entidad Appointment
import {Credential} from "../entities/Credential"
import moment from "moment";

const Model = (entity: any) => getRepository(entity);



//Datos precargados

const users = [
    {
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "password": "hashedpassword1",
        "birthdate": new Date("1990-01-15"),
        "nDni": 123,
        "role": "user"
    },
    {
        "name": "María García",
        "email": "maria.garcia@example.com",
        "password": "hashedpassword2",
        "birthdate": new Date("1985-03-20"),
        "nDni": 234,
        "role": "user"
    },
    {
        "name": "Carlos López",
        "email": "carlos.lopez@example.com",
        "password": "hashedpassword3",
        "birthdate": new Date("1992-07-25"),
        "nDni": 345,
        "role": "user"
    },
    {
        "name": "Ana Torres",
        "email": "ana.torres@example.com",
        "password": "hashedpassword4",
        "birthdate": new Date("1995-11-10"),
        "nDni": 456,
        "role": "user"
    }
];

const appointments = [
    {
        "userId": 1,
        "date": new Date("2024-09-30"),
        "time": moment("10:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Consulta"
    },
    {
        "userId": 1,
        "date": new Date("2024-10-05"),
        "time": moment("11:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Revisión"
    },
    {
        "userId": 2,
        "date": new Date("2024-10-01"),
        "time": moment("10:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Consulta"
    },
    {
        "userId": 2,
        "date": new Date("2024-10-08"),
        "time": moment("12:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Terapia"
    },
    {
        "userId": 3,
        "date": new Date("2024-10-02"),
        "time": moment("09:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Consulta"
    },
    {
        "userId": 3,
        "date": new Date("2024-10-09"),
        "time": moment("14:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Cirujía"
    },
    {
        "userId": 4,
        "date": new Date("2024-10-03"),
        "time": moment("08:00:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Revisión"
    },
    {
        "userId": 4,
        "date": new Date("2024-10-10"),
        "time": moment("15:30:00", "HH:mm:ss").format("HH:mm:ss"),
        "status": "active",
        "Asunto":"Consulta"
    }
]; 



export const PreLoadData = async () => {


    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();


    try {

        const users_ = await queryRunner.manager.find(User);

        if (!users_.length) {
            let usersList = [];

            for (let i = 0; i < users.length; i++) {

                //crear la credencial con la info del usuario

                const credential = await queryRunner.manager.save(
                    Model(Credential).create({
                        username: users[i].email,
                        password: users[i].password
                    })
                );

                //crear el usuario y  metelrle la credencial de arriba

                const user = await queryRunner.manager.save(
                    Model(User).create({
                        name: users[i].name,
                        email: users[i].email,
                        password: users[i].password,
                        birthdate: users[i].birthdate,
                        nDni: users[i].nDni,
                        role: users[i].role,
                        credential: credential
                    })
                );



                credential.user = user; // Relacionamos la credencial aquí
                await queryRunner.manager.save(credential);
                
                /*el userList se usaba abajo en las credenciales, ya no, lo dejo por si hago una
                modificación luego, si lo dejé perdón, se me olvidó borrarlo, me perdonas?*/

                usersList.push(user);
            }



            for (let j = 0; j < appointments.length; j++) {

                // Busca al usuario por userId usando el queryRunner

                const userId = appointments[j].userId; // Obtén el userId de la cita

                const user = await queryRunner.manager.findOne(User, { where: { id: userId } }); // Consulta directa
            
                if (!user) {
                    console.error(`Usuario con ID ${userId} no encontrado.`);
                    continue; // Salta al siguiente ciclo si el usuario no existe
                }
            
                await queryRunner.manager.save(
                    Model(Appointment).create({
                        date: appointments[j].date,
                        time: appointments[j].time,
                        status: appointments[j].status,
                        Asunto:appointments[j].Asunto,
                        user: user
                    })
                );
            
            }            

            console.log("Datos precargados exitosamente con credenciales y citas.");
        }

        // Si todo es exitoso, confirma la transacción
        await queryRunner.commitTransaction();

    } catch (error) {

        // Si algo falla, deshace la transacción
        await queryRunner.rollbackTransaction();
        console.error("Error en la precarga de datos:", error);

    } finally {

        // Libera el QueryRunner
        await queryRunner.release();

    }
};







