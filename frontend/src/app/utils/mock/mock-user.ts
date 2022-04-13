import faker from '@faker-js/faker';
import { RoleEnum } from 'src/app/work-with-users/dtos/role.enum';
import { UserUpdateDto } from 'src/app/work-with-users/dtos/user-update.dto';
import { UserDto } from 'src/app/work-with-users/dtos/user.dto';

import { getRandomInt } from '../helpers/number-generation.helper';

export class MockUser {
  numberOfGeneratedElements = 30;
  atomicId = this.numberOfGeneratedElements + 10;
  users: Array<UserDto> = [];

  constructor() {
    this.users.push({
      id: this.numberOfGeneratedElements + 1,
      username: 'admin',
      password: 'admin',
      role: RoleEnum.Admin
    } as UserDto); // Admin
    this.users.push({
      id: this.numberOfGeneratedElements + 2,
      username: 'user',
      password: 'user',
      role: RoleEnum.User
    } as UserDto); // User
    for (let i = 0; i < this.numberOfGeneratedElements; i++) {
      this.users.push(this.generateSingleEmployee(i));
    }
  }

  list(): Array<UserDto> {
    return this.users;
  }

  add(dto: UserUpdateDto): UserDto {
    const addedDto = { ...dto, id: this.atomicId++ } as UserDto;
    this.users.push(addedDto);
    return addedDto;
  }

  update(id: number, data: UserUpdateDto): UserDto {
    // Find user by id
    const userPos = this.users.findIndex(user => user.id === id);
    // Create new User dto
    const newUser = { ...data, id } as UserDto;
    // Update element in the array
    this.users[userPos] = newUser;
    return newUser;
  }

  delete(id: number): void {
    const userPos = this.users.findIndex(user => user.id === id);
    console.log(this.users.splice(userPos, 1));
  }

  generateSingleEmployee(id: number): UserDto {
    return {
      id: id,
      username: faker.internet.userName(),
      password: faker.internet.password(),
      role: Object.values(RoleEnum)[getRandomInt(Object.values(RoleEnum).length - 1)]
    };
  }
}
