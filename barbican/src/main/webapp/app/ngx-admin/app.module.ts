/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import '../vendor.ts';
// import './typings.d.ts';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService, SessionStorageService, Ng2Webstorage } from 'ngx-webstorage';
import { AuthExpiredInterceptor } from '../blocks/interceptor/auth-expired.interceptor';
import { BarbicanEntityModule } from '../entities/entity.module';
import { PaginationConfig } from '../blocks/config/uib-pagination.config';
import { AuthInterceptor } from '../blocks/interceptor/auth.interceptor';
import { JhiEventManager } from 'ng-jhipster';
import { ErrorHandlerInterceptor } from '../blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from '../blocks/interceptor/notification.interceptor';
import { BarbicanSharedModule, UserRouteAccessService } from '../shared';
import {
    ProfileService
} from '../layouts';

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
      HttpModule,
      AppRoutingModule,
      BarbicanEntityModule,
      BarbicanSharedModule,
      NgbModule.forRoot(),
      ThemeModule.forRoot(),
      CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
      {
          provide: APP_BASE_HREF, useValue: '/'
      },
      ProfileService,
      PaginationConfig,
      UserRouteAccessService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
          deps: [
              LocalStorageService,
              SessionStorageService
          ]
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthExpiredInterceptor,
          multi: true,
          deps: [
              Injector
          ]
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
          deps: [
              JhiEventManager
          ]
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: NotificationInterceptor,
          multi: true,
          deps: [
              Injector
          ]
      }
  ],
})
export class AppModule {
}
