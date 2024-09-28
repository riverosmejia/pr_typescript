interface IUser {
    id: number;
    name: string; // Otras propiedades que quieras incluir
    email: string; // Por ejemplo, el email del usuario
}

interface I_AppointmentResponse {
    id: number;
    date: Date;
    time: string; // Cambiado a string para la respuesta
    user: IUser; // Incluye el objeto user
    status: boolean; // Cambiado a boolean para representar "active" como true y "cancelled" como false
}


export default I_AppointmentResponse;