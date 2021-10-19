import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HometvComponent } from './hometv.component';

const routes: Routes = [{ path: '', component: HometvComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HometvRoutingModule {}
