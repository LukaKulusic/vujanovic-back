export interface UserPayload {
    id?: number;
    name: string;
    username: string;
    occupation: string;
    password?: string;
    role: string;
    createdDate: Date;
    updatedDate: Date;
}
