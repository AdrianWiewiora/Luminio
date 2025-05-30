// User zwracany przez serwer.
// Nie zawiera hasła, ani maila
// Zgodnie z figmą powinniśmy zwracać maila i telefon, ale nie wiem czy nie powinniśmy mieć osobnego telefonu/maila do loginu i do udostępniania innym
export interface UserResponse {
  id: number;
  first_name: string;
  last_name: string;
  user_description: string;
  city: string;
  average_rating: number;
  comment_count: number;
  album_count: number;
  phone_number: string;
  email: string;
  avatar_url?: string;
}

export interface ServiceResponse {
  id: number;
  name: string;
}

export interface ContactResponse {
  id: number;
  user_id: number;
  name: string;
  contact_info: string;
}

//nie jestem pewny czy dobrze jest lista zdjęć
export interface AlbumResponse {
  id: number;
  user_id: number;
  name: string;
  description: string;
  service_id: number;
  is_public: boolean;
  cover_id: number;
  average_rating: number;
  comment_count: number;
  picture_count: number;
}

export interface PhotoResponse {
  id: number;
  user_id: number;
  album_id: number;
  category_id: number;
  file_id: number;
  created_at: number;
}

export interface AlbumReviewResponse {
  id: number;
  album_id: number;
  user_id: number;
  body: string;
  value: number;
  first_name: string;
  last_name: string;
}

export interface PhotoReviewResponse {
  id: number;
  photo_id: number;
  user_id: number;
  body: string;
  value: number;
  first_name: string;
  last_name: string;
}

// Zwracany z /api/register po nieudanej rejestracji (status code 400)
export interface RegistrationErrorResponse {
  message: string;
}
