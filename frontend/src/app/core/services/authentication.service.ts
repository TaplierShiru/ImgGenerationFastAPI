import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserDto } from 'src/app/work-with-users/dtos/user.dto';
import { UserService } from 'src/app/work-with-users/services/user.service';

import { AuthenticationLoginResponseInterface } from '../utils/authentication-login-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserDto | null>;
  public currentUser: Observable<UserDto | null>;

  constructor(private userService: UserService) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject = new BehaviorSubject<UserDto | null>(JSON.parse(currentUser!));
    } else {
      this.currentUserSubject = new BehaviorSubject<UserDto | null>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDto | null {
    return this.currentUserSubject.value;
  }

  async login(username: string, password: string): Promise<boolean> {
    const result: AuthenticationLoginResponseInterface = await this.userService.exist(username, password);
    if (result.result) {
      // Exist current user
      const userDto = {
        username,
        password,
        role: result.role
      } as UserDto;
      localStorage.setItem('currentUser', JSON.stringify(userDto));
      this.currentUserSubject.next(userDto);
      return true;
    } else {
      // User must logIn
      return false;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
