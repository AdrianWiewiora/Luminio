// Wysyłany przez klienta do serwera po rejestracji.
// Nie zawiera ID, bo będzie ono znane po wsadzeniu użytkownika do bazy.
// Hasło jest przesyłane w postaci jawnej i zostanie zahashowane na serwerze.
export interface RegistrationRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_description: string;
  // avatar_id: number; nie znamy id profilowego przy tworzeniu użytkownika (FIXME)
}

export interface PostPhotoRequest {}
export interface DeletePhotoRequest {}

export interface AddPhotoToAlbumRequest {}
export interface RemovePhotoFromAlbumRequest {}
