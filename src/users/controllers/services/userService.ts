import I_UserData from "../../../dto/I_dto";
import {createCredentialS,validateCredentialS,SavedUserInCredentialS} from "../../../service/credentialService"
import {AppDataSource} from "../../../config/appDataSource";
import { User } from "../../../entities/User";
import {Credential} from "../../../entities/Credential";
import userRepository from "../../../repositories/UserRepository";

export const createUserS = async (userData:I_UserData): Promise<User|string> => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        // Verificar si ya existe un usuario con el mismo DNI
        const existingUser = await userRepository.findOne({ where: { nDni: userData.nDni } });
        
        if (existingUser) {
            return "este Dni ya ha sido registrado perro";
        }

        const existingUser_=await userRepository.findOne({where:{email:userData.email}})

        if(existingUser_){
            return "este Email ya ha sido registrado perro";
        }

        // Crear el usuario
        const user: User = await queryRunner.manager.save(
            userRepository.create({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                birthdate: userData.birthdate,
                nDni: userData.nDni,
                role: userData.role,
            })
        ) as User;

        // Crear la credencial asociando el userId
        const credential: Credential = await createCredentialS(userData.email, userData.password, null);

        // Asignar el ID de la credencial al usuario
        user.credential = credential;

        // Guardar el usuario actualizado con la credencial
        await queryRunner.manager.save(user);

        SavedUserInCredentialS(user,credential.id);

        // Confirmar la transacción
        await queryRunner.commitTransaction();
        return user;

    } catch (error) {
        // Revertir la transacción en caso de error
        await queryRunner.rollbackTransaction();
        throw error;

    } finally {
        // Liberar el QueryRunner
        await queryRunner.release();
    }
};

export const deleteUserS = async (id: number): Promise<void> => {
    const user = await userRepository.findOneBy({ id });
    
    if (user) {
        await userRepository.remove(user); // Eliminar el usuario
    } else {
        throw new Error("Usuario no encontrado");
    }
};


export const getUserS = async ():Promise<User[]> => {
    const users:User[] = await userRepository.find({
        
        relations:{

            credential:true,
            appointments:true

        }

    })as User[];
    return users;
};

export const getUserByIdS = async (id: number):Promise<User|null>=> {

    const user:User|null = await userRepository.findOne({
    
        where:{id},
        
        relations:{ 

            credential:true

        }
        
    })as User | null;
    
    return user;
};

export const loginUserS = async (username: string, password: string): Promise<User | null> => {
    // Validar las credenciales
    const credential = await validateCredentialS(username, password);

    if (!credential) {
        return null; // Si las credenciales no son válidas, retornar null
    }

    // Buscar el usuario asociado a las credenciales válidas
    const user: User | null = await userRepository.findOne({
        where: { credential: { username } },
        relations: ["credential"] // Asegúrate de incluir las relaciones necesarias
    });

    return user; // Retornar el usuario o null si no se encuentra
};