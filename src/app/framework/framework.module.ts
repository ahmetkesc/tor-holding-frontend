import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {
  DxButtonModule,
  DxChartModule,
  DxCheckBoxModule,
  DxDataGridModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxToolbarModule,
  DxValidationGroupModule,
  DxValidatorModule,
} from 'devextreme-angular';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    ButtonModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    DxDataGridModule,
    DxToolbarModule,
    DxButtonModule,
    DxTextAreaModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxTextBoxModule,
    DxCheckBoxModule,
  ],
})
export class FrameworkModule {}
