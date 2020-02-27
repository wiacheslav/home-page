import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResizedEvent } from "angular-resize-event";
import * as THREE from 'three';
import * as POSTPROCESSING from 'postprocessing';
import { MeshLambertMaterial } from "three";


@Component({
  selector: 'app-nebula',
  templateUrl: './nebula.component.html',
  styleUrls: ['./nebula.component.scss']
})
export class NebulaComponent implements OnInit {
  @ViewChild('output', {static: true})
  output: ElementRef;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  composer: any;

  anim = () => this.animate();

  cloudParticles = [];

  constructor() { }

  animate() {
    this.cloudParticles.forEach(p => {
      p.rotation.z -=0.001;
    });
    this.composer.render(0.1);
    //this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.anim);
  }

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60,
      this.output.nativeElement.offsetWidth / this.output.nativeElement.offsetHeight,
      1, 1000);
    this.camera.position.z = 1;
    this.camera.rotation.x = 1.16;
    this.camera.rotation.y = -0.12;
    this.camera.rotation.z = 0.27

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.output.nativeElement.offsetWidth, this.output.nativeElement.offsetHeight);
    this.scene.fog = new THREE.FogExp2(0x03544e, 0.001);
    this.renderer.setClearColor(this.scene.fog.color);

    let orangeLight = new THREE.PointLight(0xcc6600,50,450,1.7);
    orangeLight.position.set(200,300,100);
    this.scene.add(orangeLight);
    let redLight = new THREE.PointLight(0xd8547e,50,450,1.7);
    redLight.position.set(100,300,100);
    this.scene.add(redLight);
    let blueLight = new THREE.PointLight(0x3677ac,50,450,1.7);
    blueLight.position.set(300,300,200);
    this.scene.add(blueLight);

    this.output.nativeElement.appendChild(this.renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load('./assets/smoke.png', (texture) => {
      const cloudGeo = new THREE.PlaneBufferGeometry(500,500);
      const cloudMaterial = new THREE.MeshLambertMaterial({
        map:texture,
        transparent: true
      });

      for(let p=0; p<50; p++) {
        let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
        cloud.position.set(
          Math.random()*800 -400,
          500,
          Math.random()*500-500
        );
        cloud.rotation.x = 1.16;
        cloud.rotation.y = -0.12;
        cloud.rotation.z = Math.random()*2*Math.PI;
        (cloud.material as MeshLambertMaterial).opacity = 0.55;
        this.cloudParticles.push(cloud);
        this.scene.add(cloud);
      }
    });

    const bloomEffect = new POSTPROCESSING.BloomEffect({
      blendFunction: POSTPROCESSING.BlendFunction.COLOR_DODGE,
      kernelSize: POSTPROCESSING.KernelSize.SMALL,
      useLuminanceFilter: true,
      luminanceThreshold: 0.3,
      luminanceSmoothing: 0.75
    });
    bloomEffect.blendMode.opacity.value = 1.5;

    const effectPass = new POSTPROCESSING.EffectPass(this.camera, bloomEffect);
    effectPass.renderToScreen = true;

    this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
    this.composer.addPass(new POSTPROCESSING.RenderPass(this.scene, this.camera));
    this.composer.addPass(effectPass);
    this.animate();
  }

  sizeChanged(event: ResizedEvent): void {
    this.renderer.setSize(event.newWidth, event.newHeight);
    this.camera.aspect = event.newWidth / event.newHeight;
    this.camera.updateProjectionMatrix();
  }

}
