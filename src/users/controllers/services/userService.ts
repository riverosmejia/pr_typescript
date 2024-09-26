import { promises } from "dns";
import I_UserData from "../../../dto/I_dto";
import I_Credential from "../../../dto/I_Credential";
import I_User from "../../../dto/I_User";
import {createCredentialS} from "../../../service/credentialService"


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

let id_=Users.length;

export const createUserS = async (userData: I_UserData): Promise<I_User> => {

    const credentialsId = await createCredentialS(userData.email, userData.password); // Crear credenciales

    let nextUserId=id_+1;

    const newUser: I_User = {
        id: nextUserId, // Asignar nuevo ID
        name: userData.name,
        email: userData.email,
        password: userData.password, // Esto puede ser mejorado; considera no almacenar la contraseña en texto claro.
        birthdate: userData.birthdate,
        nDni: userData.nDni,
        credentialsId,
        role: userData.role
    };

    Users.push(newUser); // Agregar el nuevo usuario
    return newUser; // Retornar el nuevo usuario
};

export const deleteUserS = async (id: number): Promise<void> => {

    const index = Users.findIndex(user => user.id === id);

    if (index !== -1) {

        Users.splice(index, 1); // Eliminar el usuario

    } else {

        throw new Error("Usuario no encontrado");

    }
};


export const getUsersS = async (): Promise<I_User[]> => {
  
    return Users;

};

export const getUserByIdS = async (id: number): Promise<I_User | null> => {
    const user = Users.find(u => u.id === id);
    return user || null; // Retorna el usuario o null si no se encuentra
};

export const loginUserS = async (username: string, password: string): Promise<I_User | null> => {
    
    // Buscar las credenciales que coincidan con el username y password
    const credential: I_Credential | undefined = Credentials.find(

        cred => cred.username === username && cred.password === password
    
    );

    if (!credential) {

        // Si no se encuentran las credenciales, retornar null
        return null;
    
    }

    // Buscar el usuario correspondiente a esas credenciales
    const user: I_User | undefined = Users.find(user => user.credentialsId === credential.id);

    // Devolver el usuario si lo encuentra, o null si no existe
    return user || null;
};
