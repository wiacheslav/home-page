import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ResizedEvent } from "angular-resize-event";
import { of, Subject } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";

@Component({
  selector: 'app-obj',
  templateUrl: './obj.component.html',
  styleUrls: ['./obj.component.scss']
})
export class ObjComponent implements OnInit {
  @ViewChild('output', {static: true})
  output: ElementRef;
  camera: any;
  scene: any;
  renderer: any;
  anim = () => this.animate();
  resizeEvent = new Subject<ResizedEvent>();

  animate() {
    //requestAnimationFrame(this.anim);

    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }

  constructor() { }

  ngOnInit() {
    this.camera = new THREE.PerspectiveCamera( 45, 600 / 600, 1, 5000 );
    this.camera.position.z = 2000;
    this.scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    this.scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
    this.camera.add( pointLight );
    this.scene.add( this.camera );

    let object;
    const manager = new THREE.LoadingManager(() => {
      object.position.y = 95;
      this.scene.add(object);
      this.animate();
    });

    const loader = new OBJLoader( manager );

    loader.load( './assets/plane.obj', (obj) => {
      object = obj;
    } );

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(800, 600);

    this.output.nativeElement.appendChild(this.renderer.domElement);
    const cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    cameraControls.addEventListener('change', this.anim);
    this.resizeEvent.asObservable().pipe(
      debounceTime(250)
    ).subscribe(size => this.domChanges(size));
  }

  domChanges(event: ResizedEvent) {
        this.renderer.setSize(event.newWidth, event.newHeight);
        this.camera.aspect = event.newWidth / event.newHeight;
        this.camera.updateProjectionMatrix();
        this.animate();
  }
}
