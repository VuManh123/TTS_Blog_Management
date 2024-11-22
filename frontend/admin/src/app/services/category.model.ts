export interface Category {
    id: number;
    image: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CategoryRequest {
    name: string;
    image: string;
    description: string;
}