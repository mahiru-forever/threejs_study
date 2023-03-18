import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function init() {
  const canvas = document.querySelector('#webgl')

  // scene
  const scene = new THREE.Scene()

  // red cube
  // const geometry1 = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
  // const geometry2 = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)
  const geometry3 = new THREE.BufferGeometry()
  const vertices = []
  // vertices.push(0, 0, 0)
  // vertices.push(0, 1, 0)
  // vertices.push(1, 0, 0)
  for (let i = 0; i <= 50; i++) {
    for (let j = 0; j < 3; j++) {
      vertices.push(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4
      )
    }
  }
  geometry3.setAttribute(
    'position',
    new THREE.BufferAttribute(new Float32Array(vertices), 3)
  )

  const material = new THREE.MeshBasicMaterial({
    color: 'red',
    wireframe: true
  })
  const mesh = new THREE.Mesh(geometry3, material)
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
