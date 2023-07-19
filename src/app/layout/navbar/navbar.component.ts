import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/helpers/services/common.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  constructor(private _c_: CommonService) {}

  situation = false;

  ngOnInit(): void {
    this._c_.layout.sidebar.subscribe({
      next: (value) => (this.situation = value),
    });
  }

  onToggle() {
    this._c_.layout.toggle(!this.situation);
  }

  onLogout() {
    this._c_.logout();
  }
  title: string = 'Hoş Geldiniz';
}
