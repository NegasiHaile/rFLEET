'use client'

import { useEffect, useRef } from 'react'

import * as THREE from 'three'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

import earthMap from '@assets/images/earth-night-map.jpg'
import citiesData from '@json/cities.json'
import * as helvetiker from '@json/helvetiker_regular.typeface.json'

const WIDTH = 521
const HEIGHT = 521

const cities: any = citiesData

const latLongToVector3 = (lat: number, lon: number, radius: number, heigth: number) => {
  const phi = (lat * Math.PI) / 180
  const theta = ((lon - 180) * Math.PI) / 180

  const x = -(radius + heigth) * Math.cos(phi) * Math.cos(theta)
  const y = (radius + heigth) * Math.sin(phi)
  const z = (radius + heigth) * Math.cos(phi) * Math.sin(theta)

  return new THREE.Vector3(x, y, z)
}

function createCityLabels(cities: any[]) {
  const canvas = document.createElement('canvas')
  const context: any = canvas.getContext('2d')

  // Set canvas size. You might need to adjust this depending on the resolution you want for your labels.
  canvas.width = WIDTH
  canvas.height = HEIGHT

  // Style the text. Note that font size needs to fit within the canvas dimensions.
  context.font = '30px Arial'
  context.textAlign = 'center'
  context.fillStyle = '#FFFFFF'

  cities.forEach((city) => {
    const cityPosition = latLongToVector3(city.geometry.coordinates[1], city.geometry.coordinates[0], 5, 0)
    context.fillText(city.properties.name, cityPosition.x, cityPosition.y)
  })

  return canvas
}

const labelsCanvas = createCityLabels(cities)

export const CitiesGlobe = () => {
  const ref = useRef<any>(null)

  const init = async () => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(85, WIDTH / HEIGHT, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const textureLoader = new THREE.TextureLoader()
    const fontLoader = new FontLoader()

    const labelsCanvas = createCityLabels(cities)
    var labelsTexture = new THREE.CanvasTexture(labelsCanvas)

    const earthTexture = textureLoader.load(earthMap.src)
    const material = new THREE.MeshBasicMaterial({ map: earthTexture, alphaMap: labelsTexture })
    const shpere = new THREE.Mesh(geometry, material)
    const font = await fontLoader.parse(helvetiker)

    // Add lights to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // white light with half intensity
    const pointLight = new THREE.PointLight(0xffffff, 1) // white light with full intensity
    pointLight.position.set(100, 100, 100) // position the point light

    scene.add(ambientLight)
    scene.add(pointLight)

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i]

      const cityRadius = Math.max(0.1, Math.min(0.5, city.properties.pop_max / 20000000))

      const cityGeometry = new THREE.SphereGeometry(cityRadius, 32, 32)
      const cityMaterial = new THREE.MeshBasicMaterial({ color: 0xb28231, opacity: 0.9, transparent: true })
      const citySphere = new THREE.Mesh(cityGeometry, cityMaterial)

      const cityPosition = latLongToVector3(city.geometry.coordinates[1], city.geometry.coordinates[0], 5, -cityRadius)
      citySphere.position.copy(cityPosition)

      const textPosition = cityPosition.clone()
      textPosition.y -= 0.6

      shpere.add(citySphere)
    }

    scene.add(shpere)
    camera.position.y = 4
    camera.position.z = 7.2
    camera.lookAt(scene.position)

    renderer.setSize(WIDTH, HEIGHT)
    ref.current && ref.current.appendChild(renderer.domElement)

    const animate = function () {
      requestAnimationFrame(animate)
      shpere.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()
  }
  useEffect(() => {
    init()
  }, [])

  return <div ref={ref}></div>
}
