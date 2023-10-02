import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from './demo/service/auth.guide';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

//web application router for all pages client and admin

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch:"full",
      },
      {
        path: 'signup',
        loadComponent: () => import('./demo/pages/authentication/auth-signup/auth-signup.component'),
      },
      {
        path: 'signin',
        loadComponent: () => import('./demo/pages/authentication/auth-signin/auth-signin.component'),
      },
      {
        path: 'home',
        loadComponent: () => import('./demo/home/home/home.component'),
        canActivate: [IsAuthenticatedGuard],
      },

      {
        path: 'apply',
        loadComponent: () => import('./demo/home/apply/apply.component'),
        canActivate: [IsAuthenticatedGuard],
      },

      {
        path: 'viewApplication',
        loadComponent: () => import('./demo/home/userApplication/user-application.component'),
        canActivate: [IsAuthenticatedGuard],
      },

    ],
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [IsAuthenticatedGuard],
    children: [  
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
        canActivate: [IsAuthenticatedGuard],
 
      },
      {
        path: 'applicant',
        loadChildren: () =>
          import('./demo/applicants/applicant.module').then(
            (m) => m.ApplicantModule
          ),
        canActivate: [IsAuthenticatedGuard],

      },
      {
        path: 'applicant',
        loadChildren: () =>
          import('./demo/applicants/add_applicants/add-applicants.module').then(
            (m) => m.AddApplicantsModule
          ),
        canActivate: [IsAuthenticatedGuard],

      },
      {
        path: 'user',
        loadChildren: () =>
          import('./demo/users/user.module').then(
            (m) => m.UserModule
          ),
          canActivate: [IsAuthenticatedGuard],

      },
      
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
