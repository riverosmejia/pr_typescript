import moment from 'moment';

interface I_Appoinment {

    date: Date;
    time: moment.Moment; // Mantén esto como Moment
    userId: number;
    status: boolean // true-->activo, false-->inactivo

}

export default I_Appoinment;



/*
    
    Appointment:

        id: ID numérico que identifica al turno.

        date: fecha para la cual fue reservado el turno.

        time: hora para la cual fue reservado el turno.

        userId: ID del usuario que agendó el turno, referencia al usuario

*/