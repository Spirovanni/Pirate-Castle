import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'jhi-pages',
  template: `
    <jhi-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </jhi-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
