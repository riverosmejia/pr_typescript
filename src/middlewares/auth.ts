import { Request,Response,NextFunction } from "express";

const auth =(req:Request,res:Response,next:NextFunction)=>{

    const { token } = req.headers;

    if(token==="autenticado"){

        next();

    }

    else{

        res.status(400).json("no funciona perra");

    }

};

export default auth;