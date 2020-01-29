import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('output', {static: true})
  output: ElementRef;

  mesh: any;
  camera: any;
  scene: any;
  renderer: any;
  anim = () => this.animate();

  ngOnInit(): void {
    this.camera = new THREE.PerspectiveCamera( 70, 800 / 600, 0.01, 10 );
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial({wireframe: false});
    const ambientLight = new THREE.AmbientLight( 0x333333 );
    const light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
    light.position.set( 15, 40, 35 );

    const materialColor = new THREE.Color();
    materialColor.setRGB( 1.0, 1.0, 1.0 );

    const phongMaterial = new THREE.MeshPhongMaterial( { color: materialColor, side: THREE.DoubleSide } );

    this.mesh = new THREE.Mesh( geometry, phongMaterial );
    this.scene.add( this.mesh );

    this.scene.add( ambientLight );
    this.scene.add( light );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setSize( 800, 600 );

    this.output.nativeElement.appendChild(this.renderer.domElement );

    const cameraControls = new OrbitControls( this.camera, this.renderer.domElement );
    cameraControls.addEventListener( 'change', this.anim );
    this.animate();
  }

  animate() {
    // requestAnimationFrame(this.anim);

    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  }
}
