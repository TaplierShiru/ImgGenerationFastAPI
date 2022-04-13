import { RoleEnum } from './role.enum';

export class UserUpdateDto {
  username: string;
  password: string;
  role: RoleEnum;
}
