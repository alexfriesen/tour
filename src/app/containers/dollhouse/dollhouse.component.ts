import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AmbientLight, BoxGeometry, Color, DirectionalLight, Material, MathUtils, Mesh, MeshBasicMaterial, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, Quaternion, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from 'three';

@Component({
  selector: 'app-container-dollhouse',
  templateUrl: './dollhouse.component.html',
  styleUrls: ['./dollhouse.component.scss']
})
export class DollhouseComponent implements AfterViewInit, OnDestroy {

  @ViewChild('container')
  container!: ElementRef;

  initialized = false;

  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;

  private isUserInteracting = false;
  private onPointerDownMouseX = 0;
  private onPointerDownMouseY = 0;

  private lon = -181;
  private lat = -46;
  private phi = 0;
  private theta = 0;

  private onPointerDownLat = 0;
  private onPointerDownLon = 0;

  constructor() {
    this.scene = new Scene();
    this.scene.background = new Color(0xcce0ff);

    this.camera = new PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera.position.set(10, 10, 0);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
  }

  ngAfterViewInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private init(): void {
    const container = this.container.nativeElement;

    this.scene.add(this.createFloor());

    this.scene.add(this.createWall(new Vector3(2, 0, 0), new Vector3(0, MathUtils.degToRad(90), 0)));
    this.scene.add(this.createWall(new Vector3(0, 0, 2), new Vector3(0, 0, 0)));
    this.scene.add(this.createWall(new Vector3(-2, 0, 0), new Vector3(0, MathUtils.degToRad(90), 0)));
    this.scene.add(this.createWall(new Vector3(0, 0, -2), new Vector3(0, 0, 0)));

    this.scene.add(new AmbientLight(0x666666));

    const dirLight = new DirectionalLight(0x666666);
    dirLight.position.set(3, 10, 0);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    this.scene.add(dirLight);

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

  private createWall(position: Vector3, rotation: Vector3) {
    const geometry = new BoxGeometry(4, 1, .2);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(1, 1, 1);
    geometry

    const material = new MeshPhongMaterial({ color: new Color('white') });

    const mesh = new Mesh(geometry, material);
    mesh.position.add(position);
    mesh.rotation.setFromVector3(rotation);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  private createFloor() {
    const geometry = new PlaneGeometry(4, 4, 1);
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(1, 1, 1);

    const material = new MeshPhongMaterial({ color: new Color('white') });

    const mesh = new Mesh(geometry, material);
    mesh.position.set(0, -0.5, 0);
    mesh.rotateX(MathUtils.degToRad(-90));
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
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

    console.log(this.lon, this.lat)

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

    // if (this.isUserInteracting === false) {
    //   this.lon += 0.01;
    // }

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

}
