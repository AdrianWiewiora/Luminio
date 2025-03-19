// User zwracany przez serwer.
// Nie zawiera hasła, ani maila
// Zgodnie z figmą powinniśmy zwracać maila i telefon, ale nie wiem czy nie powinniśmy mieć osobnego telefonu/maila do loginu i do udostępniania innym
export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  user_description: string;
  city: string;
}

export interface ServiceResponse {
  id: number;
  name: string;
}

export interface LinksResponse {
  portfolio_url: string;
  linkedin_url: string;
  instagram_url: string;
  dribble_url: string;
  other_url: string;
}

//nie jestem pewny czy dobrze jest lista zdjęć
export interface AlbumResponse {
  id: number;
  user_id: number;
  name: string;
  description: string;
  service_id: number;
  photos: PhotoResponse[];
}

export interface PhotoResponse {} //TODO

export interface AlbumReviewResponse {
  album_id: number;
  body: string;
  value: number;
}

export interface PhotoReviewResponse {
  photo_id: number;
  body: string;
  value: number;
}

// Zwracany z /api/register po nieudanej rejestracji (status code 400)
export interface RegistrationErrorResponse {
  message: string;
}
