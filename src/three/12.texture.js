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
  // doorColorTexture.offset.x = 0.5
  // doorColorTexture.offset.y = 0.5
  // doorColorTexture.offset.set(0.5, 0.5)

  // doorColorTexture.center.set(0.5, 0.5)
  // doorColorTexture.rotation = Math.PI / 4

  // doorColorTexture.repeat.set(2, 3)
  // doorColorTexture.wrapS = THREE.MirroredRepeatWrapping
  // doorColorTexture.wrapT = THREE.RepeatWrapping

  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({
    color: '#ffff00',
    map: doorColorTexture
    // wireframe: true
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.visible = true
  scene.add(mesh)

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
  camera.lookAt(mesh.position)
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
