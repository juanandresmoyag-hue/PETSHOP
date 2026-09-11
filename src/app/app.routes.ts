import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirección por defecto
  { path: 'inicio', component: InicioComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/inicio' } // Ruta comodín por si escriben mal la URL
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
