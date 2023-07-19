import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <sidebar>
      <router-outlet></router-outlet>
    </sidebar>
  `,
})
export class AppPagesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
