import React, { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, ContactShadows, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Import the model
import sneakerModel from '../assets/models/nike_air_max_akatsuki.glb';

const Model = ({ isMobile, ...props }) => {
    const { scene } = useGLTF(sneakerModel);
    const modelRef = useRef();

    // 1. Slow idle rotation
    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.003;
        }
    });

    useMemo(() => {
        scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                if (child.material) {
                    child.material.side = THREE.DoubleSide;
                    child.material.transparent = false;
                }
            }
        });
    }, [scene]);

    return (
        // 3. Move model higher (little bit only)
        <Center position={[0, 0.2, 0]}>
            <primitive
                ref={modelRef}
                object={scene}
                {...props}
                scale={isMobile ? 1.8 : 1.6}
            />
        </Center>
    );
};

const SneakerCanvas = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className={`w-full relative ${isMobile ? 'h-[320px]' : 'h-[700px]'}`}
            style={{ touchAction: 'none' }}
        >
            <Canvas
                shadows
                camera={{ position: [0, 0, 5], fov: 40 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true, shadowMapType: THREE.PCFShadowMap }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={1.2} />
                    <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={3} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={1.5} />
                    <directionalLight position={[0, 10, 0]} intensity={2} />
                    <Environment preset="city" />

                    <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.5}>
                        <Model isMobile={isMobile} />
                    </Float>

                    {/* Re-enabled OrbitControls for Dragging interaction */}
                    <OrbitControls
                        enableZoom={false}
                        minDistance={3.5}
                        maxDistance={6.5}
                        enablePan={false}
                        enableDamping={true}
                        dampingFactor={0.05}
                        rotateSpeed={0.8}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        makeDefault
                    />

                    <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={2.5} far={5} />
                </Suspense>
            </Canvas>
        </div>
    );
};

const Hero = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className={`relative flex items-center bg-[#F2F2F2] overflow-hidden ${isMobile ? 'min-h-[115vh]' : 'min-h-screen'} pt-16 md:pt-0`}>
            {/* Background Logo */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-center -z-0 opacity-5 select-none pointer-events-none">
                <h1 className="text-[25vw] font-black tracking-tighter text-black rotate-[-5deg] uppercase font-heading">SNEAKHUB</h1>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-brand-accent/10 blur-[120px] rounded-full -z-0 pointer-events-none" />

            <div className={`max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row items-center h-full justify-between ${isMobile ? 'pb-10 pt-4' : 'py-20'}`}>

                {/* 3D Model - Moved Up in Mobile */}
                <div className={`order-1 md:order-2 flex-1 w-full relative flex justify-center items-center ${isMobile ? '-mt-12' : ''}`}>
                    <Suspense fallback={null}>
                        <SneakerCanvas />
                    </Suspense>
                </div>

                {/* Content - Compact for Mobile */}
                <div className={`order-2 md:order-1 flex-1 text-center md:text-left ${isMobile ? 'mt-0' : 'md:-mt-24'}`}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] font-bold text-black/40 mb-3 md:mb-6 font-inter underline underline-offset-8 decoration-brand-accent decoration-2">
                            PREMIUM FOOTWEAR
                        </p>

                        <h1 className="text-[38px] sm:text-6xl lg:text-7.5xl font-black leading-[0.9] tracking-tighter mb-4 md:mb-8 font-heading uppercase text-black">
                            WELCOME TO<br />
                            <span className="text-brand-accent">SNEAKHUB.</span>
                        </h1>

                        <p className="text-sm md:text-lg text-black/60 leading-relaxed max-w-lg mx-auto md:mx-0 mb-6 md:mb-10 font-inter px-4 md:px-0">
                            Experience the ultimate fusion of performance and street style. Our newest collection redefined for the modern legend.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start px-10 md:px-0">
                            <button className="px-10 md:px-12 py-4 md:py-5 bg-black text-white font-black tracking-widest rounded-none hover:bg-brand-accent transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl uppercase text-xs md:text-sm">
                                SHOP COLLECTION
                            </button>
                            <button className="px-10 md:px-12 py-4 md:py-5 bg-transparent border-2 border-black/10 text-black font-black tracking-widest rounded-none hover:border-black transition-all transform hover:-translate-y-1 active:scale-95 uppercase text-xs md:text-sm">
                                EXPLORE BRANDS
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator - hide on small screens to save space */}
            {!isMobile && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/20">Scroll</span>
                    <div className="w-[2px] h-10 bg-gradient-to-b from-black/10 to-transparent" />
                </div>
            )}
        </section>
    );
};

// Preload
useGLTF.preload(sneakerModel);

export default Hero;
