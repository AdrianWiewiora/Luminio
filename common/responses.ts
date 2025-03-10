// User zwracany przez serwer.
// Nie zawiera hasła, ani maila
export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  user_description: string;
}
