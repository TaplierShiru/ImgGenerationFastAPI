import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  animations: [
    trigger('appearErrorMessage', [
      state(
        'wrong',
        style({
          appearance: 1
        })
      ),
      state(
        'good',
        style({
          appearance: 0
        })
      ),
      transition('* => *', animate(150))
    ])
  ]
})
export class LoginPageComponent implements OnInit {
  userLogInForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  loginValid = true;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async onSubmit() {
    if (!this.userLogInForm.valid) {
      return;
    }
    try {
      const result: boolean = await this.authenticationService.login(
        this.userLogInForm.get('login')!.value,
        this.userLogInForm.get('password')!.value
      );

      if (result) {
        this.loginValid = true;
        console.log('login');
        this.goToStartPage();
      } else {
        this.loginValid = false;
        console.log('Wrong login/password');
      }
    } catch (err) {
      console.log(err);
    }
  }

  getStateErrorMessage(): string {
    if (this.loginValid) {
      return 'wrong';
    } else {
      return 'good';
    }
  }

  goToStartPage(): void {
    this.router.navigate(['/start-page']);
  }
}
