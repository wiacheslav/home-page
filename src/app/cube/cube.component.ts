import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/js/libs/stats.min.js';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ResizedEvent } from "angular-resize-event";

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  @ViewChild('output', {static: true})
  output: ElementRef;

  mesh: any;
  camera: any;
  scene: any;
  renderer: any;
  anim = () => this.animate();
  stats: any;

  animate() {
    // requestAnimationFrame(this.anim);

    // this.mesh.rotation.x += 0.01;
    // this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

  ngOnInit(): void {
    this.camera = new THREE.PerspectiveCamera(70, 800 / 600, 0.01, 10);
    this.camera.position.z = 1;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x484848);

    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshNormalMaterial({wireframe: true});
    const ambientLight = new THREE.AmbientLight(0x333333);
    const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(15, 40, 35);

    const materialColor = new THREE.Color();
    materialColor.setRGB(1.0, 1.0, 1.0);

    const phongMaterial = new THREE.MeshPhongMaterial({color: materialColor, side: THREE.DoubleSide});

    this.mesh = new THREE.Mesh(geometry, phongMaterial);
    this.scene.add(this.mesh);

    this.scene.add(ambientLight);
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(800, 600);

    this.output.nativeElement.appendChild(this.renderer.domElement);
    this.stats = new Stats();
    this.stats.dom.style.top = null;
    this.stats.dom.style.left = null;
    this.output.nativeElement.appendChild(this.stats.dom);

    const cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    cameraControls.addEventListener('change', this.anim);
    this.animate();
  }

  domChanges(event: ResizedEvent) {
    this.renderer.setSize(event.newWidth, event.newHeight);
    this.camera.aspect = event.newWidth / event.newHeight;
    this.camera.updateProjectionMatrix();
    this.animate();
  }
}
