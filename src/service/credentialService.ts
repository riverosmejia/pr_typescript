import { Credential } from '../entities/Credential';

import credentialRepository from '../repositories/CredentialRepository';

import { User } from '../entities/User';

// Función para crear un nuevo par de credenciales
export const createCredentialS = async (username: string, password: string, user: User | null): Promise<Credential> => {
    // Crear el nuevo objeto de credencial
    const newCredential: Credential = credentialRepository.create({
        username,
        password,
        // Solo asignar el usuario si no es null
        ...(user && { user }), // Usamos el operador de propagación para incluir el usuario solo si existe
    }) as Credential;

    // Guardar la nueva credencial en la base de datos
    const savedCredential: Credential = await credentialRepository.save(newCredential);
    return savedCredential; // Retornar la credencial guardada
};


export const SavedUserInCredentialS = async (user: User, credentialId: number): Promise<Credential> => {
    
    // Buscar la credencial por su ID
    const credential = await credentialRepository.findOne({ where: { id: credentialId } });
    
    // Si la credencial no existe, lanzar un error
    if (!credential) {
        throw new Error(`Credential with ID ${credentialId} not found.`);
    }

    // Asignar el usuario a la credencial
    credential.user = user;

    // Guardar los cambios en la base de datos
    const updatedCredential = await credentialRepository.save(credential);

    return updatedCredential; // Retornar la credencial actualizada
};



// Función para validar credenciales
export const validateCredentialS = async (username: string, password: string): Promise<string | null> => {
    // Buscar la credencial en la base de datos
    const credential = await credentialRepository.findOne({
        where: { username }
    });

    // Verificar si la credencial existe y si la contraseña coincide
    if (credential && credential.password === password) {
        return credential.username; // Retornar el username si las credenciales son válidas
    }
    
    return null; // Retornar null si no son válidas
};

