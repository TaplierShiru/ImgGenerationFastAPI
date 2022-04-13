import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit, OnDestroy {
  private mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private media: MediaMatcher,
    private cd: ChangeDetectorRef,
    private translate: TranslateService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => this.cd.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnDestroy() {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  async logout() {
    this.authenticationService.logout();
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  get user(): any {
    return this.authenticationService.currentUserValue;
  }

  get mobile(): boolean {
    return this.mobileQuery.matches;
  }

  get currentLanguage() {
    return this.translate.currentLang;
  }

  get languages() {
    return this.translate.getLangs();
  }
}
