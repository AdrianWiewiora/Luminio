export interface NewDbPhoto {
    user_id: number;
    album_id: string;
    file_path: string;
    category_id: number;
  }
  
  export interface DbPhoto extends NewDbPhoto {
    id: number;
    created_at: number;
  }