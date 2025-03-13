import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { authGuard } from './login/util/auth.guard';
import { MainPageMembersComponent } from './main-page-members/main-page-members.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'song-list', component: MainPageMembersComponent, canActivate: [authGuard]},
    { path: 'login', component: LoginComponent },
    {path: '', component: MainPageComponent}
];
