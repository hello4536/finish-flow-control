
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  last_login: string | null;
}

export interface UserCreate extends Omit<User, "id" | "last_login"> {}
export interface UserUpdate extends Partial<User> {}
