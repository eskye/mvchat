import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


const components = [
   FooterComponent,
   HeaderComponent
]

@NgModule({
    imports:[
       CommonModule, 
       RouterModule,
    ],
    declarations:components,
    exports:components
})

export class SharedModule{}