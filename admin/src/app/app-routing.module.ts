import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/programs' },
  { path: 'programs', loadChildren: () => import('./pages/programs/programs.module').then(m => m.ProgramsModule) },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  // { path: 'autorize', loadChildren: () => import('./pages/autorize/autorize.module').then(m => m.AutorizeModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
