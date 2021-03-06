import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './Layout/home/home.component';
import { DashboardComponent } from './Module/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path : '', redirectTo:'home',pathMatch:'full'},
  {path :'login', component :LoginComponent},
  {path :'home', component:HomeComponent, canActivate: [AuthGuard],
  children :[
    {path :'', redirectTo :'dashboard',pathMatch :'full'},
    {path :'dashboard', component:DashboardComponent, canActivate: [AuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
