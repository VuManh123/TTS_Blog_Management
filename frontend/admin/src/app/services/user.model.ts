export interface User {
    id: number;
    username: string;
    image: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
    active: string
  }

  export interface AddAdminRequest {
    username: string;
    email: string;
    password: string;
    role: string;
    active: string;
  }