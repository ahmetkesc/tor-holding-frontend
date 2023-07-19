import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/helpers/services/common.service';
import { IMenu } from 'src/app/shared/interfaces/menu.interface';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  constructor(private _c_: CommonService) {
    this.menus = [
      {
        id: 1,
        title: 'PrimeNg İle Kullanıcı Arayüzü',
        icon: '../../../assets/img/primeng-logo.png',
        subMenus: [
          {
            id: 1,
            title: 'Kullanıcılar',
            path: '/p-users',
          },
        ],
      },
      {
        id: 2,
        title: 'Angular-Mat İle Kullanıcı Arayüzü',
        icon: '../../../assets/img/angular-mat-logo.png',
        subMenus: [
          {
            id: 1,
            title: 'Kullanıcılar',
            path: '/mat-users',
          },
        ],
      },
      {
        id: 3,
        title: 'Devextreme İle Kullanıcı Arayüzü',
        icon: '../../../assets/img/devextreme-logo.png',
        subMenus: [
          {
            id: 1,
            title: 'Kullanıcılar',
            path: '/dx-users',
          },
        ],
      },
    ];
  }

  menus: IMenu[] = [];
  selectedMenu!: IMenu;
  sidebar_toggled: boolean = false;
  onSelectMenu(e: IMenu) {
    if (!e) return;

    this.selectedMenu = e;

    if (this.selectedMenu.subMenus && this.selectedMenu.subMenus?.length == 0)
      return;
    this._c_.router.navigate([this.selectedMenu.subMenus![0].path]);
  }

  onRoute(e: IMenu) {
    if (!e) return;
    if (!e.path) return;
    this._c_.router.navigate([e.path]);
  }
  onRouteBase() {
    this._c_.router.navigate(['/']);
  }
  onToggle() {
    this._c_.layout.toggle(!this.sidebar_toggled);
  }

  ngOnInit(): void {
    this._c_.layout.sidebar.subscribe({
      next: (value) => {
        this.sidebar_toggled = value;
      },
    });
  }
}
