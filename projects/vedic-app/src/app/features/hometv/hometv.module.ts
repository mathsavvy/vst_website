import { NgModule } from '@angular/core';

import { HometvRoutingModule } from './hometv-routing.module';
import { HometvComponent } from './hometv.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HometvComponent],
  imports: [SharedModule, HometvRoutingModule],
})
export class HometvModule {}
