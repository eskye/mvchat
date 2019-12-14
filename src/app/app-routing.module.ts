import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServiceComponent } from './pages/service/service.component'; 
import { ChatComponent } from './pages/chat/chat.component';
import { PagesViewComponent } from './pages/pages-view/pages-view.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'index',
    pathMatch:'full'
  },
  {path:'', component: PagesViewComponent, children:[
    {path: 'index', component: HomePageComponent},
    {path:'about', component:AboutComponent},
    {path:'contact', component: ContactComponent},
    {path:'service', component:ServiceComponent},
    {path:'chat', component:ChatComponent}
  ]
},
 { path: 'login', loadChildren: './pages/auth/auth.module#AuthModule' },
  {path:'**', redirectTo:'index', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
