import { promises } from "dns";
import I_UserData from "../../../dto/I_dto";
import I_Credential from "../../../dto/I_Credential";
import I_User from "../../../dto/I_User";
import {createCredentialS} from "../../../service/credentialService"
import {AppDataSource} from "../../../config/appDataSource";
import { User } from "../../../entities/User";
import {Credential} from "../../../entities/Credential";
import { RelationId } from "typeorm";
import { Appointment } from "../../../entities/Appointment";

const Model = (entity: any) => AppDataSource.getRepository(entity);
/*
const Users: I_User[] = [
    {
        id: 1,
        name: "Miguel Riveros",
        email: "miguel@example.com",
        password: "securepassword1", // Recuerda que este es solo un ejemplo.
        birthdate: new Date("1990-05-15"), // Formato de fecha
        nDni: 12345678,
        credentialsId: 1,
        role: "admin"
    },
    {
        id: 2,
        name: "Ana Pérez",
        email: "ana@example.com",
        password: "securepassword2",
        birthdate: new Date("1992-08-22"),
        nDni: 87654321,
        credentialsId: 2,
        role: "user"
    }
];


const Credentials: I_Credential[] = [
    {
        id: 1,
        username: "miguel_riveros",
        password: "securepassword1"
    },
    {
        id: 2,
        username: "ana_perez",
        password: "securepassword2"
    }
];

*/

export const createUserS = async (userData: I_UserData): Promise<User> => {
    const userRepository = Model(User);
    const credentialRepository = Model(Credential);
  
    // Crear la credencial primero
    const newCredential = credentialRepository.create({
        username: userData.email, // Asumiendo que el email será el username
        password: userData.password,
    });
    
    // Guardar la credencial
    const savedCredential = await credentialRepository.save(newCredential);

    // Crear el usuario con la relación a Credential
    const user = userRepository.create({
        name: userData.name,
        password: userData.password,
        email: userData.email,
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        role: userData.role,
        credential: savedCredential, // Relación con Credential
    });

    // Guardar el usuario
    const result = await userRepository.save(user) as User;
    
    return result;
};




export const deleteUserS = async (id: number): Promise<void> => {
    const userRepository = Model(User);
    const user = await userRepository.findOneBy({ id });
    
    if (user) {
        await userRepository.remove(user); // Eliminar el usuario
    } else {
        throw new Error("Usuario no encontrado");
    }
};


export const getUserS = async ():Promise<User[]> => {
    const userRepository = Model(User);
    const users:User[] = await userRepository.find({
        
        relations:{

            credential:true,
            appointments:true

        }

    })as User[];
    return users;
};
/*
export const getUserS = async (): Promise<User[]> => {
    const userRepository = Model(User);
    const users: User[] = await userRepository.find({
        relations: ["credential"], // Debes usar "relations" con un arreglo de strings
    });

    return users;
};
*/

export const getUserByIdS = async (id: number):Promise<User|null>=> {
    const userRepository = Model(User);

    const user:User|null = await userRepository.findOne({
    
        where:{id},
        
        relations:{ 

            credential:true

        }
        
    })as User | null;
    
    return user;
};

export const loginUserS = async (username: string, password: string): Promise<I_User | null> => {
    const credentialRepository = Model(Credential);
    const userRepository = Model(User);

    // Buscar las credenciales en la base de datos
    const credential = await credentialRepository.findOne({
        where: { username, password }
    });

    if (!credential) {
        return null; // Retornar null si no se encuentra la credencial
    }

    // Buscar el usuario asociado a las credenciales
    const user:I_User = await userRepository.findOne({
        where: { credentialsId: credential.id }
    })as I_User;

    return user || null; // Retornar el usuario o null si no se encuentra
};