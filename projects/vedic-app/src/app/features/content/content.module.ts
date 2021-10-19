import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ChronologyComponent } from './chronology/chronology.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContentComponent,
    AboutusComponent,
    ContactusComponent,
    ChronologyComponent,
  ],
  imports: [CommonModule, ContentRoutingModule, SharedModule],
})
export class ContentModule {}
