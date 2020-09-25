import React, { useEffect } from "react"
import * as THREE from "three"
import Link from "next/link"

// import cities from "../lib/cityGeo"

const Hero = () => {
  // useEffect(() => {
  //   var camera = new THREE.PerspectiveCamera(
  //       60,
  //       window.innerWidth / 569,
  //       1,
  //       1500
  //     ),
  //     scene = new THREE.Scene(),
  //     renderer = new THREE.WebGLRenderer({ antialias: true }),
  //     geometry = new THREE.Geometry(),
  //     mat = new THREE.ParticleBasicMaterial({ color: 0xffffff, size: 3 }),
  //     radius = 1250

  //   // Setup
  //   camera.position.z = 1500
  //   camera.position.y = 1250
  //   renderer.setSize(window.innerWidth, 569)
  //   const container = document.getElementById("bucket")
  //   container.appendChild(renderer.domElement)

  //   // Take geographic coordinates and convert them
  //   // into cartesian coordinates (x,y,z)
  //   var geoToCartesian = function (lat, lon, radius) {
  //     var x, y, z
  //     lat *= Math.PI / 180
  //     lon *= Math.PI / 180
  //     x = -radius * Math.cos(lat) * Math.cos(lon)
  //     y = radius * Math.sin(lat)
  //     z = radius * Math.cos(lat) * Math.sin(lon)
  //     return new THREE.Vector3(x, y, z)
  //   }

  //   cities.forEach(function (city) {
  //     var vertex = geoToCartesian(city[0], city[1], 400)

  //     geometry.vertices.push(vertex)

  //     var factor = 100 + Math.random() * 1000
  //     var growth = Math.min(0.9, 0.35 + Math.random())

  //     requestAnimationFrame(function update() {
  //       factor *= growth
  //       if (factor > 1) requestAnimationFrame(update)
  //       vertex.normalize().multiplyScalar(radius + factor)
  //     })
  //   })

  //   var particles = new THREE.ParticleSystem(geometry, mat)

  //   scene.add(particles)

  //   // So that the globe may rotate, setup an animation loop and incrementally rotate
  //   requestAnimationFrame(function update() {
  //     requestAnimationFrame(update)

  //     var time = Date.now() * 0.00005

  //     particles.rotation.y += 0.007
  //     particles.geometry.verticesNeedUpdate = true

  //     renderer.render(scene, camera)
  //   })
  // }, [])

  return (
    <div id="hero" className="relative overflow-hidden bg-black mb-12">
      <div id="bucket" className="absolute inset-0 z-0"></div>
      <div className="max-w-screen-xl relative mx-auto text-center py-12 md:py-28 px-4 sm:px-6 z-10">
        <h3 className="uppercase text-lg tracking-widest font-bold text-rb-gray-5">
          Remote jobs
        </h3>
        <h1 className="text-white font-black text-2xl md:text-6xl md:leading-45 my-4">
          Start working remotely and join the future of work
        </h1>
        <h2 className="text-base md:text-xl text-rb-gray-4 w-3/4 mx-auto">
          Do you want to access talent{" "}
          <strong className="text-white">everywhere</strong>, or just in
          specific markets? If the answer is everywhere, look no further and let
          Remote Bond help you.
        </h2>
        <span className="inline-flex rounded-md shadow-sm mt-8">
          <Link href={`/remote-jobs/new`} as={`/remote-jobs/new`}>
            <a className="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 font-bold rounded-md text-white bg-rb-green-6 hover:bg-rb-green-5 hover:text-white focus:outline-none focus:border-rb-green-7 focus:shadow-outline-blue active:bg-rb-green-7 transition ease-in-out duration-150">
              Post a job for $25
            </a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Hero
