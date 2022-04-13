import { RoleEnum } from 'src/app/work-with-users/dtos/role.enum';

export interface AuthenticationLoginResponseInterface {
  result: boolean;
  role: RoleEnum;
}
