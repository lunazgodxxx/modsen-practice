export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

type UserResponse = {
  id: number;
  username: string;
  email: string;
  roles: string[];
};

export interface IAuthenticate {
  readonly user: UserResponse;
  readonly token: string;
}
