export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  username: string;

  roles: string[];

  createdAt: Date;
  updatedAt: Date;
}
