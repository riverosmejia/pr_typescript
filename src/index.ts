//const server=require("./server"); esto genera error a la hora de importar

import server from './server';

import { PORT } from './config/envs';

import "reflect-metadata";

import { AppDataSource } from './config/appDataSource';

import { PreLoadData } from './helpers/preloadData';

AppDataSource.initialize()

.then(res=>{

    console.log("conexión exitosa mi amol");

    PreLoadData() 
    .then(

        res=>server.listen(PORT,()=>{

        console.log(`servidor escuchando en puerto ${PORT}`);
            
        })

            
    )

});
/*
server.listen(PORT,listen);

function listen(){

    console.log(`server listening on port ${PORT}`);

}
*/