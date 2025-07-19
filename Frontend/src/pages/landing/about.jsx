import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text3D } from '@react-three/drei';
import fontJson from '../../assets/helvetiker_regular.typeface.json';
import * as THREE from 'three';

function Divertion3DLogo({ animation }) {
  const material = useRef();
  // Animate gradient color only
  return (
    <motion.group animate={animation} initial={false} position={[-5, 0, 0]}>
      <Text3D
        font={fontJson}
        size={1.5}
        height={0.5}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.09}
        bevelSize={0.06}
        bevelOffset={0}
        bevelSegments={8}
        castShadow
        receiveShadow
      >
        Divertion
        <meshPhysicalMaterial
          ref={material}
          metalness={0.85}
          roughness={0.12}
          clearcoat={0.8}
          reflectivity={0.9}
          transmission={0.3}
          thickness={0.8}
          ior={1.45}
          emissive="#ec4899"
          emissiveIntensity={0.18}
          color="#ec4899"
        />
      </Text3D>
      <Text3D
        font={fontJson}
        size={0.5}
        height={0.18}
        position={[0.2, -1.1, 0]}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.025}
        bevelOffset={0}
        bevelSegments={8}
        castShadow
        receiveShadow
      >
        Event Management
        <meshPhysicalMaterial
          metalness={0.7}
          roughness={0.18}
          clearcoat={0.7}
          reflectivity={0.8}
          transmission={0.18}
          thickness={0.5}
          ior={1.4}
          color="#e9d5ff"
        />
      </Text3D>
    </motion.group>
  );
}

const About = () => {
  const controls = useAnimation();
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.5);
  useEffect(() => {
    let timeout;
    if (autoRotateSpeed === 0.5) {
      timeout = setTimeout(() => setAutoRotateSpeed(30), 2000);
    } else {
      timeout = setTimeout(() => setAutoRotateSpeed(0.5), 500);
    }
    return () => clearTimeout(timeout);
  }, [autoRotateSpeed]);
  React.useEffect(() => {
    controls.start({
      y: [ -8, 0, -0.7, 0 ],
      scale: [0.7, 1.1, 0.98, 1],
      opacity: [0, 1, 1, 1],
      transition: {
        duration: 1.6,
        times: [0, 0.7, 0.85, 1],
        ease: [0.4, 0.8, 0.2, 1],
      },
    });
  }, [controls]);

  return (
    <section className="relative py-24 px-4 min-h-[600px] flex flex-col md:flex-row items-center md:items-stretch justify-center gap-12 overflow-hidden">
      {/* Glowing background lights */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-500 opacity-30 blur-3xl z-0" style={{filter:'blur(120px)'}}></div>
      <div className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-500 opacity-25 blur-3xl z-0" style={{filter:'blur(100px)'}}></div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[350px] h-[350px] rounded-full bg-purple-500 opacity-20 blur-3xl z-0" style={{filter:'blur(90px)'}}></div>
      <div className="w-full md:w-1/2 h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl bg-transparent flex items-start justify-start mb-10 md:mb-0">
        <Canvas camera={{ position: [0, 0, 9], fov: 50 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 10, 10]}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0005}
          />
          <spotLight
            position={[-5, 10, 10]}
            angle={0.3}
            penumbra={0.7}
            intensity={1.2}
            color="#ec4899"
            castShadow
          />
          <Divertion3DLogo animation={controls} />
          {/* Ground plane for shadow catching */}
          <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.25} />
          </mesh>
          <Environment preset="sunset" background={false} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={autoRotateSpeed} />
        </Canvas>
      </div>
      <motion.div
        className="w-full md:w-1/2 max-w-xl flex flex-col justify-center items-end text-right"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">A Few Words About <span className="text-pink-500">Divertion</span></h2>
        <p className="text-gray-300 text-lg mb-6">
          Divertion is your trusted platform for discovering and managing events. Whether you’re looking for concerts, workshops, or conferences, we make it easy to find and join the best happenings around you. Our mission is to connect people through unforgettable experiences.
        </p>
        <button className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-semibold px-6 py-2 rounded-full transition">More About Us</button>
      </motion.div>
    </section>
  );
};

export default About; 