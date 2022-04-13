import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationLoginResponseInterface } from 'src/app/core/utils/authentication-login-response.interface';

import { UserUpdateDto } from '../dtos/user-update.dto';
import { UserDto } from '../dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<UserDto, UserUpdateDto> {
  constructor(http: HttpClient) {
    super(http, UserDto);
  }

  async exist(username: string, password: string): Promise<AuthenticationLoginResponseInterface> {
    throw new Error();
  }

  async get(id: number): Promise<UserDto> {
    throw new Error();
  }

  async create(data: UserUpdateDto): Promise<UserDto> {
    throw new Error();
  }

  async getAll(): Promise<Array<UserDto>> {
    throw new Error();
  }

  async delete(id: number): Promise<any> {
    throw new Error();
  }
}
