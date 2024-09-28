export interface I_UserData {
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    nDni: number;
    role: string;
}

export interface I_CredentialData {
    username: string;
    password: string;
  }

export default I_UserData;
