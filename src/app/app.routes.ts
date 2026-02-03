import { Routes } from '@angular/router';
import { IntroGuard } from './guards/intro-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full',
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)
  },

  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage)
  },

  {
    path: 'menu',
    loadComponent: () => import('./menu/menu.page').then( m => m.MenuPage),
    children:[
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
        canActivate: [IntroGuard]
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.page').then( m => m.FavoritesPage)
      },
    ]
  },
  {
    path: 'songs-modal',
    loadComponent: () => import('./songs-modal/songs-modal.page').then( m => m.SongsModalPage)
  },


];
