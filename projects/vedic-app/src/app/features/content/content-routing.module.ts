import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ChronologyComponent } from './chronology/chronology.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ContentComponent } from './content.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'chronology',
        component: ChronologyComponent,
      },
      {
        path: 'aboutus',
        component: AboutusComponent,
      },
      {
        path: 'contactus',
        component: ContactusComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
