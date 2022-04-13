import { Component, OnInit } from '@angular/core';

import { UserDto } from '../../dtos/user.dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-users-page',
  templateUrl: './manage-users-page.component.html',
  styleUrls: ['./manage-users-page.component.scss']
})
export class ManageUsersPageComponent implements OnInit {
  columns = ['username', 'role', 'actions'];
  users: Array<UserDto>;

  constructor(public userService: UserService) {}

  async ngOnInit() {
    this.users = await this.userService.getAll();
  }

  async delete(userId: number) {
    await this.userService.delete(userId).then(() => this.tableUpdate());
  }

  async tableUpdate() {
    this.users = [];
    this.users = await this.userService.getAll();
  }
}
