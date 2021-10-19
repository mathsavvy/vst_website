import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValidationErrorsComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ValidationErrorsComponent,
  ],
})
export class SharedModule {}
