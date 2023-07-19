import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [CommonModule],
  exports: [SidebarComponent, NavbarComponent],
  declarations: [SidebarComponent, NavbarComponent],
})
export class LayoutModule {}
