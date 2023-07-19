import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PUsersComponent } from './p-users/p-users.component';
import { MatUsersComponent } from './mat-users/mat-users.component';
import { DxUsersComponent } from './dx-users/dx-users.component';
import { RouterModule, Routes } from '@angular/router';
import { FrameworkModule } from '../framework/framework.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatUserDialogComponent } from './mat-users/mat-users-dialog.component';
import { LoginComponent } from './login/login.component';
import { LayoutModule } from '../layout/layout.module';
import { AppPagesComponent } from './pages.app.component';
import { Guards } from '../helpers/guards';

const routes: Routes = [
  {
    component: AppPagesComponent,
    path: '',
    children: [
      {
        component: HomeComponent,
        path: '',
        canActivate: [Guards.guard],
      },
      {
        component: PUsersComponent,
        path: 'p-users',
        canActivate: [Guards.guard],
      },
      {
        component: MatUsersComponent,
        path: 'mat-users',
        canActivate: [Guards.guard],
      },
      {
        component: DxUsersComponent,
        path: 'dx-users',
        canActivate: [Guards.guard],
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FrameworkModule,
    FormsModule,
    LayoutModule,
  ],
  exports: [RouterModule, FrameworkModule, LayoutModule],
  declarations: [
    HomeComponent,
    PUsersComponent,
    MatUsersComponent,
    MatUserDialogComponent,
    DxUsersComponent,
    LoginComponent,
    AppPagesComponent,
  ],
  providers: [],
})
export class PagesModule {}
