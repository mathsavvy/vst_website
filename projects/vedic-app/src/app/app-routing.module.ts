import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home/:tv',
    loadChildren: () =>
      import('./features/hometv/hometv.module').then((m) => m.HometvModule),
  },
  {
    path: 'content',
    loadChildren: () =>
      import('./features/content/content.module').then((m) => m.ContentModule),
  },
  {
    path: '*',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
