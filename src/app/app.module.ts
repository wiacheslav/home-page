import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CubeComponent } from './cube/cube.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {ObserversModule} from "@angular/cdk/observers";
import {AngularResizedEventModule} from "angular-resize-event";
import { ObjComponent } from './obj/obj.component';
import { OrthoCamComponent } from './ortho-cam/ortho-cam.component';
import { NebulaComponent } from './nebula/nebula.component';

@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    ObjComponent,
    OrthoCamComponent,
    NebulaComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AngularResizedEventModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
