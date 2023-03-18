import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import * as dat from 'dat.gui'
// import gsap from 'gsap'

export function init() {
  const canvas = document.querySelector('#webgl')

  // scene
  const scene = new THREE.Scene()

  // texture
  const textureLoader = new THREE.TextureLoader()
  // 贴图
  const doorColorTexture = textureLoader.load(
    require('./images/texture/color.jpg')
  )
  // 透明贴图
  const alphaTexture = textureLoader.load(require('./images/texture/alpha.jpg'))
  // 环境遮挡贴图
  const aoTexture = textureLoader.load(
    require('./images/texture/ambientOcclusion.jpg')
  )
  // 置换贴图
  const heightTexture = textureLoader.load(
    require('./images/texture/height.png')
  )
  // 粗糙度贴图
  const roughnessTexture = textureLoader.load(
    require('./images/texture/roughness.jpg')
  )
  // 金属度
  const metalnessTexture = textureLoader.load(
    require('./images/texture/metalness.jpg')
  )
  // 法线贴图
  // const normalTexture = textureLoader.load('./images/texture/normal.jpg')

  // cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // material
  const material = new THREE.MeshStandardMaterial({
    color: '#ffff00',
    map: doorColorTexture,
    alphaMap: alphaTexture,
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: aoTexture,
    aoMapIntensity: 1,
    displacementMap: heightTexture,
    displacementScale: 0.05,
    roughness: 1,
    roughnessMap: roughnessTexture,
    metalness: 1,
    metalnessMap: metalnessTexture,
    normalMap: textureLoader.load('./images/texture/normal.jpg')
    // wireframe: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // plane
  const planeGeometry = new THREE.PlaneGeometry(1, 1, 200, 200)
  const plane = new THREE.Mesh(planeGeometry, material)
  plane.position.set(1, 0, 0.5)
  planeGeometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
  )
  scene.add(plane)

  // light
  const light = new THREE.AmbientLight(0xffffff, 1) // 环境光
  scene.add(light)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  // directionalLight.position.set(10, 10, 10)
  directionalLight.position.set(0, 0, -5)
  scene.add(directionalLight)

  // size
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  // camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  )

  camera.position.set(0, 0, 3)
  // camera.lookAt(plane.position)
  scene.add(camera)

  // controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  // axeshelper
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // resize
  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // update renderer
    renderer.setSize(sizes.width, sizes.height)
  })

  // fullscreen
  window.addEventListener('dblclick', () => {
    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen()
      } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  })

  // animations
  const tick = () => {
    // update camera

    // update controls
    controls.update()

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
  }
  tick()
}
