import express from 'express';
import router  from './users/index';
import appRouter from  './appointmens/AppoinmentRoutes';

const server=express();

server.use(express.json());

server.use(router);

server.use(appRouter);

export default server;

//router->routes->controller->services

/*
Proyecto - Mapa de la estructura del servidor:

- **server**
  - `import server from './server'`
  - Contiene la configuración y el arranque del servidor.
  - Tiene dos routers principales:

  1. **Router de Usuarios (`/users`)**
     - Ruta base: `/users`
     - Servicios asociados:
       1. `createUserS`: Crea un nuevo usuario.
       2. `deleteUserS`: Elimina un usuario existente.
       3. `getUserS`: Obtiene los datos de un usuario.
       4. `updateUserS`: Actualiza la información de un usuario.
     
  2. **Router de Turnos (`/appointments`)**
     - Ruta base: `/appointments`
     - Servicios asociados:
       1. `createAppointmentS`: Crea un nuevo turno.
       2. `deleteAppointmentS`: Cancela un turno existente.
       3. `getAppointmentS`: Obtiene los datos de un turno.
       4. `updateAppointmentS`: Actualiza la información de un turno.

- **Controladores**:
  - Cada router tiene un controlador que maneja la lógica de los endpoints y llama a los servicios correspondientes.

- **Servicios**:
  - Los servicios son funciones que interactúan con la base de datos o realizan las operaciones lógicas para las entidades **User** y **Appointment**.
  - Los servicios siguen el patrón de CRUD:
    - Create
    - Read (Get)
    - Update
    - Delete

- **Entidades principales**:
  1. **User**: Usuarios que utilizan el sistema.
  2. **Appointment**: Turnos que los usuarios pueden reservar o cancelar.
  3. **Credential**: Autenticación y manejo de credenciales de los usuarios.
*/
