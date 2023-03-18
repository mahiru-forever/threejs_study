import * as THREE from 'three'

export function init() {
  const canvas = document.querySelector('#webgl')

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
  // const aspectRatio = sizes.width / sizes.height
  // const camera = new THREE.OrthographicCamera(
  //   -1 * aspectRatio,
  //   1 * aspectRatio,
  //   1,
  //   -1,
  //   0.1,
  //   100
  // )

  // camera.position.x = 2
  // camera.position.y = 2
  camera.position.z = 3
  camera.lookAt(mesh.position)
  scene.add(camera)

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas
  })
  renderer.setSize(sizes.width, sizes.height)

  // const clock = new THREE.Clock()

  // animations
  const tick = () => {
    // const elapsedTime = clock.getElapsedTime()
    // mesh.rotation.y = elapsedTime

    // render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick)
  }
  tick()
}
