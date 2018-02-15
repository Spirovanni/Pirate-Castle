/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { JhiLanguageHelper } from '../shared';

@Component({
  selector: 'jhi-ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
      private analytics: AnalyticsService,
      private jhiLanguageHelper: JhiLanguageHelper,
      private router: Router
  ) {}

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
      let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'barbicanApp';
      if (routeSnapshot.firstChild) {
          title = this.getPageTitle(routeSnapshot.firstChild) || title;
      }
      return title;
  }

  ngOnInit(): void {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
          }
      });
      this.analytics.trackPageViews();
  }
}
