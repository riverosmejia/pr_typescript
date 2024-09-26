
interface I_Appoinment{

    id:number,
    date:Date,
    time:string,
    userId:number,
    status:boolean

}

export default I_Appoinment;

/*
    
    Appointment:

        id: ID numérico que identifica al turno.

        date: fecha para la cual fue reservado el turno.

        time: hora para la cual fue reservado el turno.

        userId: ID del usuario que agendó el turno, referencia al usuario

*/