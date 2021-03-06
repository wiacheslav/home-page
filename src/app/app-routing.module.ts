import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CubeComponent} from "./cube/cube.component";
import { ObjComponent } from "./obj/obj.component";
import { OrthoCamComponent } from "./ortho-cam/ortho-cam.component";
import { NebulaComponent } from "./nebula/nebula.component";


const routes: Routes = [
  {component: CubeComponent, path: 'cube'},
  {component: ObjComponent, path: 'obj'},
  {component: OrthoCamComponent, path: 'ortho'},
  {component: NebulaComponent, path: 'nebula'},
  {path: '', redirectTo: 'nebula', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
