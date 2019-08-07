import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotLoggedInGuard} from './guards/not-logged-in-guard.service';
import {AuthGuard} from './guards/auth.guard';
import { MapGuard } from './guards/map.guard';
import { AreaGuard } from './guards/area.guard';

const routes: Routes = [

  {
    path: '', canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'area', pathMatch: 'full' },
      { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
      { path: 'home/schedule', loadChildren: './pages/home/home.module#HomePageModule'},
      { path: 'area', canActivate: [AreaGuard], loadChildren: './pages/area/area.module#AreaPageModule' },
      { path: 'map', canActivate: [MapGuard], loadChildren: './pages/map/map.module#MapPageModule' },
      { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
      { path: 'badges', loadChildren: './pages/badges/badges.module#BadgesPageModule' },
      { path: 'collection', loadChildren: './pages/collection/collection.module#CollectionPageModule' },
      { path: 'organism/:id', loadChildren: './pages/organism/organism.module#OrganismPageModule' },
      { path: 'catch/:id', loadChildren: './pages/catch/catch.module#CatchPageModule' },
      { path: 'friend-collection', loadChildren: './pages/friend-collection/friend-collection.module#FriendCollectionPageModule' },
      { path: 'friend/:id', loadChildren: './pages/friend/friend.module#FriendPageModule' }
    ]
  },
  {
    path: 'public', canActivate: [NotLoggedInGuard], children: [
      {path: 'sign-up', loadChildren: './public/sign-up/sign-up.module#SignUpPageModule'},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
