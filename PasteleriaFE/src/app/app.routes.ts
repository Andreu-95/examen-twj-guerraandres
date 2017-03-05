import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {HomeComponent} from "./home/home.component";
import {PasteleriaComponent} from "./pasteleria/pasteleria.component";
import {PastelComponent} from "./pastel/pastel.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'Pasteleria', component: PasteleriaComponent},
  {path: 'Pasteleria/:idPasteleria/Pasteles', component: PastelComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
