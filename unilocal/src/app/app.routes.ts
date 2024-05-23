
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBusinessComponent } from './components/business/register-business/register-business.component';
import { NavComponent } from './components/nav/nav.component';


export const routes: Routes = [
    {path: 'dashboard' , component: RegisterBusinessComponent},
    {path: 'main' , component: NavComponent},
    {path : '**' , redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }