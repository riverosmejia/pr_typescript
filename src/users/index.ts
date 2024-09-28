import {Router,Request,Response} from 'express';

import { createUser,getAllUser,getUserById, deleteUser } from './controllers/userController';
import auth from '../middlewares/auth';

const router:Router = Router();

//obtener todos los usuarios

router.get("/users",getAllUser);

//obtener usuario por ID

router.get("/user/:id",getUserById);

//crear un usuario

router.post("/users",createUser);

//borrar un usuario

router.delete("/user/:id",deleteUser);

export default router;
