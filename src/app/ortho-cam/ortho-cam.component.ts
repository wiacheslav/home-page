import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { Lut } from "three/examples/jsm/math/Lut";
import { WebGLRenderer } from "three";

@Component({
  selector: 'app-ortho-cam',
  templateUrl: './ortho-cam.component.html',
  styleUrls: ['./ortho-cam.component.scss']
})
export class OrthoCamComponent implements OnInit {
  @ViewChild('output', {static: true})
  output: ElementRef;
  orthoCamera: any;
  scene: any;
  lut: Lut;
  renderer: WebGLRenderer;

  anim = () => this.animate();

  constructor() { }

  ngOnInit(): void {
    this.lut = new Lut();
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 2);
    this.orthoCamera.position.set( 0.5, 0, 1 );
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xffffff );
    let sprite = new THREE.Sprite( new THREE.SpriteMaterial( {
      map: new THREE.CanvasTexture( this.lut.createCanvas() )
    } ) );
    sprite.scale.x = 0.125;

    const materialColor = new THREE.Color();
    materialColor.setRGB(1.0, 1.0, 1.0);
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const phongMaterial = new THREE.MeshPhongMaterial({color: materialColor, side: THREE.DoubleSide});


    this.scene.add( sprite );

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(600, 600);

    this.lut.setColorMap('rainbow');
    this.lut.setMax( 2000 );
    this.lut.setMin( 0 );

    const map = sprite.material.map;
    this.lut.updateCanvas( map.image );
    map.needsUpdate = true;

    this.output.nativeElement.appendChild(this.renderer.domElement);
    requestAnimationFrame(this.anim);
  }

  animate(): void {
    this.renderer.clear();
    this.renderer.render(this.scene, this.orthoCamera);
    requestAnimationFrame(this.anim);
  }
}
