import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export function init() {
  const canvas = document.querySelector('#webgl')

  // scene
  const scene = new THREE.Scene()

  // red cube
  // const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)
  // const positions = new Float32Array(9)
  // positions[0] = 0
  // positions[1] = 0
  // positions[2] = 0

  // positions[3] = 0
  // positions[4] = 1
  // positions[5] = 0

  // positions[6] = 1
  // positions[7] = 0
  // positions[8] = 0
  const positions = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0])
  const positionsAttribute = new THREE.BufferAttribute(positions, 3)
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', positionsAttribute)

  const material = new THREE.MeshBasicMaterial({
    color: 'red',
    wireframe: true
  })
  const mesh = new THREE.Mesh(geometry, material)
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
