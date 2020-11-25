import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { MathUtils, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereBufferGeometry, Texture, TextureLoader, WebGLRenderer } from 'three';
import { Room } from './model/room.interface';

@Component({
  selector: 'app-panorama',
  templateUrl: './panorama.component.html',
  styleUrls: ['./panorama.component.scss'],
})
export class PanoramaComponent implements OnDestroy {
  @ViewChild('container')
  container!: ElementRef;

  @Input()
  set room(room: Room | undefined) {
    if (!room) return;

    const src = room.positions[0].panos[0].file.absolute_path_url;

    if (!this.initialized) {
      this.init(src);
    } else {
      this.setImageSource(src);
    }
  }

  initialized = false;

  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private material!: MeshBasicMaterial;

  private isUserInteracting = false;
  private onPointerDownMouseX = 0;
  private onPointerDownMouseY = 0;

  private lon = 0;
  private lat = 0;
  private phi = 0;
  private theta = 0;

  private onPointerDownLat = 0;
  private onPointerDownLon = 0;

  constructor() {
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    this.scene = new Scene();
    this.renderer = new WebGLRenderer();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private async setImageSource(src: string): Promise<void> {
    if (this.material) {

      const texture = await this.fetchTexture(src);
      texture.needsUpdate = true;

      this.material.map = texture;
    }
  }

  private async init(src: string): Promise<void> {
    const container = this.container.nativeElement;

    const geometry = new SphereBufferGeometry(500, 60, 40);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(- 1, 1, 1);

    const texture = await this.fetchTexture(src);
    this.material = new MeshBasicMaterial({ map: texture });

    const mesh = new Mesh(geometry, this.material);

    this.scene.add(mesh);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(this.renderer.domElement);
    container.style.touchAction = 'none';

    document.addEventListener('pointerdown', this.onPointerDown.bind(this), false);
    document.addEventListener('wheel', this.onDocumentMouseWheel.bind(this), false);
    window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this.initialized = true;
    this.animate();
  }

  private onWindowResize(): void {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);

  }

  private onPointerDown(event: PointerEvent): void {
    if (event.isPrimary === false) return;

    this.isUserInteracting = true;

    this.onPointerDownMouseX = event.clientX;
    this.onPointerDownMouseY = event.clientY;

    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;

    document.addEventListener('pointermove', this.onPointerMove.bind(this), false);
    document.addEventListener('pointerup', this.onPointerUp.bind(this), false);
  }

  private onPointerMove(event: PointerEvent): void {
    if (event.isPrimary === false || !this.isUserInteracting) return;

    this.lon = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
    this.lat = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;

  }

  private onPointerUp(event: PointerEvent): void {
    if (event.isPrimary === false) return;

    this.isUserInteracting = false;

    document.removeEventListener('pointermove', this.onPointerMove.bind(this));
    document.removeEventListener('pointerup', this.onPointerUp.bind(this));

  }

  private onDocumentMouseWheel(event: WheelEvent): void {

    const fov = this.camera.fov + event.deltaY * 0.05;

    this.camera.fov = MathUtils.clamp(fov, 10, 75);

    this.camera.updateProjectionMatrix();

  }

  private animate(): void {

    requestAnimationFrame(() => this.animate());
    this.update();

  }

  private update(): void {

    if (this.isUserInteracting === false) {
      this.lon += 0.01;
    }

    this.lat = Math.max(- 85, Math.min(85, this.lat));
    this.phi = MathUtils.degToRad(90 - this.lat);
    this.theta = MathUtils.degToRad(this.lon);

    const x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
    const y = 500 * Math.cos(this.phi);
    const z = 500 * Math.sin(this.phi) * Math.sin(this.theta);

    this.camera.lookAt(x, y, z);

    this.renderer.render(this.scene, this.camera);

  }

  private cleanup(): void {
    document.removeEventListener('pointerup', this.onPointerUp.bind(this));
    document.removeEventListener('pointermove', this.onPointerMove.bind(this));
    document.removeEventListener('pointerdown', this.onPointerDown.bind(this), false);

    document.removeEventListener('wheel', this.onDocumentMouseWheel.bind(this), false);

    window.removeEventListener('resize', this.onWindowResize.bind(this), false);

  }

  private async fetchTexture(src: string): Promise<Texture> {
    const loader = new TextureLoader();

    const texture = await loader.loadAsync(src);

    return texture;
  }
}
