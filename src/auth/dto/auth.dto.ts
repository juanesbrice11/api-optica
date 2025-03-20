export enum Role {
    ADMIN =
        'admin',
    SECRETARY =
        'secretary'
}

export class LoginDto {
    email: string;
    password: string;
}

export class RegisterDto {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}
