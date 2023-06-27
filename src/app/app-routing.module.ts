import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import { PackagesComponent } from '@pages/packages/packages.component';
import { RolesComponent } from '@pages/roles/roles.component';
import { OrdersComponent } from '@pages/orders/orders.component';
import { CostumersComponent } from '@pages/costumers/costumers.component';
import { EmployeesComponent } from '@pages/employees/employees.component';
import { UsersComponent } from '@pages/users/users.component';
import { MainClientComponent } from '@modules/main-client/main-client.component';
import { HomeClientComponent } from '@modules/main-client/home-client/home-client.component';
import { homedir } from 'os';

const routes: Routes = [
    {
      path: 'main/admin',
      component: MainComponent,
      //canActivate: [NonAuthGuard],
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        // Rutas para el rol de Administrador
        {
          path: '',
          component: DashboardComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },
        {
          path: 'Paquetes',
          component: PackagesComponent
        },
        {
          path: 'Roles',
          component: RolesComponent
        },
        {
          path: 'Pedidos',
          component: OrdersComponent
        },
        {
          path: 'Clientes',
          component: CostumersComponent
        },
        {
          path: 'Empleados',
          component: EmployeesComponent
        },
        {
          path: 'Usuarios',
          component: UsersComponent
        }
      ]
    },
    {
      path: 'main/client',
      component: MainClientComponent,
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      children: [
        // Rutas para el rol de Cliente
        {
          path: '',
          component: HomeClientComponent
        },
      ]
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [NonAuthGuard]
    },
    {
      path: 'register',
      component: RegisterComponent,
      canActivate: [NonAuthGuard]
    },
    {
      path: 'forgot-password',
      component: ForgotPasswordComponent,
      canActivate: [NonAuthGuard]
    },
    {
      path: 'recover-password',
      component: RecoverPasswordComponent,
      canActivate: [NonAuthGuard]
    },
    { path: '**', redirectTo: 'client/main' }
  ];
  

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
