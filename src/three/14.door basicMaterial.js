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
  const doorColorTexture = textureLoader.load(
    require('./images/texture/color.jpg')
  )
  const alphaTexture = textureLoader.load(require('./images/texture/alpha.jpg'))
  const aoTexture = textureLoader.load(
    require('./images/texture/ambientOcclusion.jpg')
  )

  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: '#ffff00',
    map: doorColorTexture,
    alphaMap: alphaTexture,
    transparent: true,
    side: THREE.DoubleSide,
    aoMap: aoTexture,
    aoMapIntensity: 1
    // wireframe: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const planeGeometry = new THREE.PlaneGeometry(1, 1)
  const plane = new THREE.Mesh(planeGeometry, material)
  plane.position.set(1.5, 0, 0)
  planeGeometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
  )
  scene.add(plane)

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

  camera.position.z = 3
  camera.lookAt(plane.position)
  scene.add(camera)

  // controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

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
