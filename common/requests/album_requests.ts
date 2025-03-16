export interface CreateAlbumRequest {
    user_id: number;
    name: string;
    description: string;
    service_id: number;
    is_public: boolean;
}

export interface UpdateAlbumRequest {
    album_id: number;
    name?: string;
    description?: string;
    service_id?: number;
    is_public?: boolean;
}
export interface AddPhotoToAlbumRequest {
    photo_id: number;
    album_id: number;
}
