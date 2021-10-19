import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    //vendor
    BrowserModule,
    RouterModule,
  ],
  exports: [MainLayoutComponent],
})
export class CoreModule {}
