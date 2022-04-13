import { Injectable } from '@angular/core';
import { AuthenticationLoginResponseInterface } from 'src/app/core/utils/authentication-login-response.interface';
import { MockUser } from 'src/app/utils/mock/mock-user';
import { FakeService } from 'src/app/utils/services/fake-base.service';

import { RoleEnum } from '../dtos/role.enum';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class FakeUserService extends FakeService<UserDto, UserUpdateDto> {
  usersMock: MockUser;

  constructor() {
    super();
    this.usersMock = new MockUser();
  }

  async exist(username: string | null, password: string | null): Promise<AuthenticationLoginResponseInterface> {
    return new Promise<AuthenticationLoginResponseInterface>((resolve, reject) => {
      const foundUsers = this.usersMock
        .list()
        .filter(val => val.username === username && val.password === password).length;
      const result = foundUsers != 0;
      let resultResponse = {
        result: false,
        role: RoleEnum.User
      };
      if (result) {
        resultResponse.role = RoleEnum.Admin;
        resultResponse.result = true;
      }
      resolve(resultResponse);
    });
  }

  async get(id: number): Promise<UserDto> {
    return new Promise<UserDto>((resolve, reject) => {
      resolve(this.usersMock.list().filter(val => val.id === id)[0]);
    });
  }

  async create(data: UserUpdateDto): Promise<UserDto> {
    return new Promise<UserDto>((resolve, reject) => {
      const addedDto = this.usersMock.add(data);
      resolve(addedDto);
    });
  }

  async getAll(): Promise<Array<UserDto>> {
    return new Promise<Array<UserDto>>((resolve, reject) => {
      resolve(this.usersMock.list());
    });
  }

  async delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.usersMock.delete(id);
      resolve(true);
    });
  }
}
