// Wysyłany przez klienta do serwera po rejestracji.
// Nie zawiera ID, bo będzie ono znane po wsadzeniu użytkownika do bazy.
// Hasło jest przesyłane w postaci jawnej i zostanie zahashowane na serwerze.
export interface RegistrationRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_description: string;
    phone_number: string;
    city: string;
}

export interface UpdateUserRequest {
    id: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    user_description?: string;
    phone_number?: string;
    city?: string;
    portfolio_url?: string;
    linkedin_url?: string;
    instagram_url?: string;
    dribble_url?: string;
    other_url?: string;
}
