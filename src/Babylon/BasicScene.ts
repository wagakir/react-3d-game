import * as BABYLON from "@babylonjs/core";

export default class BasicScene {
  private scene: BABYLON.Scene;
  private engine: BABYLON.Engine;
  private uvScale: number = 4;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas);
    this.scene = this.createScene();
    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  createScene(): BABYLON.Scene {
    const scene = new BABYLON.Scene(this.engine);
    const camera: BABYLON.UniversalCamera = new BABYLON.UniversalCamera(
      "camera",
      new BABYLON.Vector3(0, 1, -3),
      scene
    );
    camera.attachControl();
    camera.speed = 0.25;
    const ground: BABYLON.GroundMesh = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10, subdivisions: 1000, updatable: true },
      scene
    );
    ground.applyDisplacementMap(
      "/textures/asphalt/asphalt_02_disp_1k.png",
      0,
      0.1,
      undefined,
      undefined,
      new BABYLON.Vector2(this.uvScale, this.uvScale)
    );
    ground.material = this.createGroundMaterial();
    const ball: BABYLON.Mesh = BABYLON.MeshBuilder.CreateSphere(
      "ball",
      { diameter: 1 },
      scene
    );
    ball.position.y = 1;
    const light: BABYLON.DirectionalLight = new BABYLON.DirectionalLight(
      "light",
      new BABYLON.Vector3(1, -1, 0),
      scene
    );
    return scene;
  }
  createGroundMaterial(): BABYLON.StandardMaterial {
    const groundMaterial = new BABYLON.StandardMaterial(
      "groundMaterial",
      this.scene
    );
    const texturesArray: Array<BABYLON.Texture> = [];

    const diffuseTex: BABYLON.Texture = new BABYLON.Texture(
      "/textures/asphalt/asphalt_02_diff_1k.png",
      this.scene
    );
    texturesArray.push(diffuseTex);

    const aoTex: BABYLON.Texture = new BABYLON.Texture(
      "/textures/asphalt/asphalt_02_ao_1k.png",
      this.scene
    );
    texturesArray.push(aoTex);

    const normalTex: BABYLON.Texture = new BABYLON.Texture(
      "/textures/asphalt/asphalt_02_nor_gl_1k.png",
      this.scene
    );
    texturesArray.push(normalTex);

    const roughTex = new BABYLON.Texture(
      "/textures/asphalt/asphalt_02_rough_1k.png"
    );
    texturesArray.push(roughTex);
    groundMaterial.useGlossinessFromSpecularMapAlpha = true;

    texturesArray.forEach((obj) => {
      obj.uScale = this.uvScale;
      obj.vScale = this.uvScale;
    });
    groundMaterial.invertNormalMapX = true;
    groundMaterial.invertNormalMapY = true;
    groundMaterial.specularTexture = roughTex;
    groundMaterial.diffuseTexture = diffuseTex;
    groundMaterial.ambientTexture = aoTex;
    groundMaterial.bumpTexture = normalTex;
    return groundMaterial;
  }
}
