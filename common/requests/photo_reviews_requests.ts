export interface CreatePhotoReviewRequest {
    photo_id: number;
    body: string;
    value: number;
}

export interface UpdatePhotoReviewRequest {
    photo_review_id: number;
    body?: string;
    value?: number;
}
