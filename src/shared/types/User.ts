export interface IUser {
    id: string;
    nome: string;
    username: string;
    status?: boolean;
    role: UserTypes;
}

export enum UserTypes {
    ADMIN="ADMIN",
    MEDICO="MEDICO",
    ENFERMEIRO="ENFERMEIRO"
}