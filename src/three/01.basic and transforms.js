import * as THREE from 'three'

export function init() {
  const canvas = document.querySelector('#webgl')

  // scene
  const scene = new THREE.Scene()

  // red cube
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material)
  // mesh.position.x = 0.7
  // mesh.position.y = -0.6
  // mesh.position.z = 1
  mesh.position.set(0.7, -0.6, 1)
  scene.add(mesh)
  // console.log(mesh.position.length()) // 离坐标系中心距离
  // mesh.position.normalize() // 移动到距离相机 为1的位置

  // scale
  // mesh.scale.x = 2
  // mesh.scale.y = 0.5
  // mesh.scale.z = 0.5
  mesh.scale.set(2, 0.5, 0.5)

  // rotation
  mesh.rotation.reorder('YXZ')
  // mesh.rotation.x = Math.PI * 0.25
  // mesh.rotation.y = Math.PI * 0.25
  mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)
  // mesh.rotation.reorder('YXZ')

  // axes helper
  const axesHelper = new THREE.AxesHelper(2)
  scene.add(axesHelper)

  // size
  const sizes = {
    width: 800,
    height: 600
  }

  // // camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 3
  // camera.position.x = 1
  // camera.position.y = 1
  scene.add(camera)
  camera.lookAt(mesh.position)
  // console.log(mesh.position.distanceTo(camera.position)) // 离相机距离

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.render(scene, camera)
}
