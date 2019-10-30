import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChildrenComponent } from './modules/children/children.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { PageNotFoundComponent } from './modules/pagenotfound/pagenotfound.component';
// import { Users } from './modules/users/users.component';

const appRoutes: Routes = [
  { path: 'children', component: ChildrenComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
