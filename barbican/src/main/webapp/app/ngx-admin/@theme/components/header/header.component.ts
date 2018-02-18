import { Component, Input, OnInit } from '@angular/core';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { JhiLanguageHelper, LoginModalService, LoginService, Principal } from '../../../../shared';
import { Router } from '@angular/router';
import { ProfileService } from '../../../../layouts';
import { VERSION } from '../../../../app.constants';

@Component({
  selector: 'jhi-ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    @Input() position = 'normal';

    user: any;
    userMenu = [{ title: 'Profile' }, { title: 'Log out' },  { title: 'Register' }];
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    constructor(
      private sidebarService: NbSidebarService,
      private menuService: NbMenuService,
      private userService: UserService,
      private analyticsService: AnalyticsService,
      private loginService: LoginService,
      private languageService: JhiLanguageService,
      private languageHelper: JhiLanguageHelper,
      private principal: Principal,
      private loginModalService: LoginModalService,
      private profileService: ProfileService,
      private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
    }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.xavier);
      this.languageHelper.getAll().then((languages) => {
          this.languages = languages;
      });

      this.profileService.getProfileInfo().then((profileInfo) => {
          this.inProduction = profileInfo.inProduction;
          this.swaggerEnabled = profileInfo.swaggerEnabled;
      });
  }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        return false;
    }

    toggleSettings(): boolean {
        this.sidebarService.toggle(false, 'settings-sidebar');
        return false;
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent('startSearch');
    }

    changeLanguage(languageKey: string) {
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
