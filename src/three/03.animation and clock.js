import * as THREE from 'three'

export function init() {
  const canvas = document.querySelector('#webgl')

  // scene
  const scene = new THREE.Scene()

  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // size
  const sizes = {
    width: 800,
    height: 600
  }

  // // camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 3
  scene.add(camera)

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas
  })
  renderer.setSize(sizes.width, sizes.height)

  // // time
  // let time = Date.now()

  // clock
  const clock = new THREE.Clock()

  // animations
  const tick = () => {
    // // time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime

    // // update objects
    // // mesh.position.x += 0.01
    // // mesh.position.y += 0.01
    // mesh.rotation.y += 0.001 * deltaTime

    const elapsedTime = clock.getElapsedTime()
    mesh.rotation.y = elapsedTime
    mesh.position.y = Math.sin(elapsedTime)
    mesh.position.x = Math.cos(elapsedTime)
    // or
    // camera.position.y = Math.sin(elapsedTime)
    // camera.position.x = Math.cos(elapsedTime)

    camera.lookAt(mesh.position)

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
  }
  tick()
}
