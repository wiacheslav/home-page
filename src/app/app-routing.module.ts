import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CubeComponent} from "./cube/cube.component";


const routes: Routes = [
  {component: CubeComponent, path: 'cube'},
  {path: '', redirectTo: 'cube', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
