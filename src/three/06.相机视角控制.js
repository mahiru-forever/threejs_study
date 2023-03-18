import * as THREE from 'three'

export function init() {
  const canvas = document.querySelector('#webgl')

  // cursor
  const cursor = { x: 0, y: 0 }
  window.addEventListener('mousemove', e => {
    cursor.x = e.clientX / sizes.width - 0.5
    cursor.y = -(e.clientY / sizes.height - 0.5)
  })

  // scene
  const scene = new THREE.Scene()

  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
  const material = new THREE.MeshBasicMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // size
  const sizes = {
    width: 800,
    height: 600
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

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas
  })
  renderer.setSize(sizes.width, sizes.height)

  // animations
  const tick = () => {
    // // update camera
    // camera.position.x = cursor.x * 10
    // camera.position.y = cursor.y * 10
    // // camera.lookAt(new THREE.Vector3())
    // camera.lookAt(mesh.position)

    // update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    // camera.lookAt(new THREE.Vector3())
    camera.lookAt(mesh.position)

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
  }
  tick()
}
