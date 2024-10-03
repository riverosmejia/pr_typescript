import { Request,Response } from "express";
import { createUserS,deleteUserS,getUserS,getUserByIdS,loginUserS } from "./services/userService";
import I_User from "../../dto/I_User";
import I_UserData from "../../dto/I_dto";
import { User } from "../../entities/User";

/*
en los controladores createUser, deleteUser, getAllUser no deja colocar controladores,
lo identifica todo como ObjectLiteral, por qué? no se, si no se encuentran las interfaces es porque
al entregar el trabajo no encontré el error
*/

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role, birthdate, nDni } = req.body; // Eliminar credentialsId

    try {
        const newUser = await createUserS({ name, email, password, role, birthdate, nDni }); // Crear el nuevo usuario

        res.status(201).json(newUser); // Cambiar a 201 para indicar creación exitosa
    } catch (err) {

        const error = err as Error;
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  // Ahora obtenemos el ID desde los parámetros
        const userId = parseInt(id);

        console.log(id)

        await deleteUserS(userId);

        res.status(200).json({ message: "Usuario eliminado... como mis ganas de vivir" });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: (error as Error).message });
    }
};

export const getAllUser=async (req:Request,res:Response)=>{
    
    const users = await getUserS();

    if(users){

    res.status(200).json(users);

    }
} ;

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id);

        const user = await getUserByIdS(userId);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: (error as Error).message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    
    try {

        // Desestructuramos el username y el password del cuerpo de la solicitud
        const { username, password } = req.body;

        // Verificamos que ambos campos estén presentes
        if (!username || !password) {
            return res.status(400).json({ message: 'Nombre de usuario y contraseña son requeridos' });
        }



        // Llamamos al servicio de login para autenticar al usuario
        const user: User | null = await loginUserS(username, password);

        // Si no se encuentra el usuario, respondemos con un error 401
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Si el usuario se encuentra, respondemos con sus datos
        
        return res.status(200).json(user); // Devuelve el usuario completo
    } catch (error) {

        // Manejamos errores y respondemos con un error 500
        return res.status(500).json({ message: 'Error en el servidor', error: (error as Error).message });
    
    }
};