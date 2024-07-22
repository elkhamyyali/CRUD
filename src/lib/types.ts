export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export type NewUser = Omit<User, "id">;
