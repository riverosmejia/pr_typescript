//const server=require("./server"); esto genera error a la hora de importar

import server from './server';

import { PORT } from './config/envs';

server.listen(PORT,listen);

function listen(){

    console.log(`server listening on port ${PORT}`);

}