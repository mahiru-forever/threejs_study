import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap'

export function init() {
  const canvas = document.querySelector('#webgl')

  // debug
  const gui = new dat.GUI({ closed: false, width: 400 })
  // gui.hide()
  const parameters = {
    color: 0xff0000,
    spin: () => {
      gsap.to(mesh.rotation, { y: mesh.rotation.y + 10, duration: 1 })
    }
  }

  // scene
  const scene = new THREE.Scene()

  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)

  const material = new THREE.MeshBasicMaterial({
    color: parameters.color
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

  // debug
  // gui.add(mesh.position, 'x', -3, 3, 0.01)
  // gui.add(mesh.position, 'y', -3, 3, 0.01)
  // gui.add(mesh.position, 'z', -3, 3, 0.01)
  gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('y坐标')
  gui.add(mesh, 'visible')
  gui.add(mesh.material, 'wireframe')
  // gui.addColor(mesh.material, 'color')
  gui.addColor(parameters, 'color').onChange(() => {
    material.color.set(parameters.color)
  })
  gui.add(parameters, 'spin')

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
