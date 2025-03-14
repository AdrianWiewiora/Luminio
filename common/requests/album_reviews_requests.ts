export interface CreateAlbumReviewRequest {
    album_id: number;
    body: string;
    value: number;
}

export interface UpdateAlbumReviewRequest {
    album_review_id: number;
    body?: string;
    value?: number;
}
