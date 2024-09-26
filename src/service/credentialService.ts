import I_Credential from '../dto/I_Credential';

let Credentials: I_Credential[] = []; // Arreglo para precarga de datos
let nextId = 1; // ID para el nuevo par de credenciales

// Función para crear un nuevo par de credenciales
export const createCredentialS = async (username: string, password: string): Promise<number> => {
    const newCredential: I_Credential = {
        id: nextId++, // Asignar un nuevo ID
        username,
        password
    };
    Credentials.push(newCredential); // Agregar a la lista de credenciales
    return newCredential.id; // Retornar el ID
};

// Función para validar credenciales
export const validateCredentialS = async (username: string, password: string): Promise<number | null> => {
    const credential = Credentials.find(c => c.username === username);
    if (credential && credential.password === password) {
        return credential.id; // Retornar el ID si las credenciales son válidas
    }
    return null; // Retornar null si no son válidas
};
