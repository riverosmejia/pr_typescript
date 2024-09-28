import I_Credential from '../dto/I_Credential';

import { Credential } from '../entities/Credential';

import { AppDataSource } from '../config/appDataSource';

const Model = (entity: any) => AppDataSource.getRepository(entity);

let Credentials: I_Credential[] = []; // Arreglo para precarga de datos
let nextId = 1; // ID para el nuevo par de credenciales

// Función para crear un nuevo par de credenciales
export const createCredentialS = async (username: string, password: string): Promise<number> => {
    const credentialRepository = Model(Credential); // Usar el modelo para obtener el repositorio

    const newCredential = credentialRepository.create({
        username,
        password
    });

    const savedCredential = await credentialRepository.save(newCredential);
    return savedCredential.id; // Retornar el ID de la credencial guardada
};



// Función para validar credenciales
export const validateCredentialS = async (username: string, password: string): Promise<number | null> => {
    const credential = Credentials.find(c => c.username === username);
    if (credential && credential.password === password) {
        return credential.id; // Retornar el ID si las credenciales son válidas
    }
    return null; // Retornar null si no son válidas
};
