import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthViewComponent } from './auth-view/auth-view.component';


const routes: Routes = [
  {path: '', component: AuthViewComponent,
  children: [
    {path: '', component: LoginComponent},
     
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
