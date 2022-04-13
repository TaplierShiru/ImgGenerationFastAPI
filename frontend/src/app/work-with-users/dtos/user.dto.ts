import { BaseDto } from 'src/app/core/dtos/base.dto';

import { RoleEnum } from './role.enum';

export class UserDto extends BaseDto {
  username: string;
  password: string;
  role: RoleEnum;
}
