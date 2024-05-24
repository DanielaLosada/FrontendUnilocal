
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterBusinessComponent } from './components/business/register-business/register-business.component';
import { NavComponent } from './components/nav/nav.component';
import { VerMapaComponent } from './components/ver-mapa/ver-mapa.component';
import { MyPlacesComponent } from './components/my-places/my-places.component';


export const routes: Routes = [
    {
        path: 'main', component: NavComponent
    },
    
    { path: 'verMapa', component: VerMapaComponent },

    {path : '**' , redirectTo: '/main', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }