"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type * as THREE from "three";

interface HeroBrainProps {
  eyebrow?: string;
  title?: string;
  titleAccent?: string;
  ledeText?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function HeroBrain({
  eyebrow = "Product & Brand Designer",
  title = "A designer who can design",
  titleAccent = "",
  ledeText = "",
  primaryHref = "/works",
  primaryLabel = "enter the work",
  secondaryHref = "/about",
  secondaryLabel = "say hello",
}: HeroBrainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !stageRef.current) return;

    let mounted = true;
    let rafId = 0;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import("three");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

      if (!mounted || !canvasRef.current || !stageRef.current) return;

      const canvas = canvasRef.current;
      const stage = stageRef.current;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.set(0, 0, 4.6);

      // Lights tuned for the vibrant prism palette
      scene.add(new THREE.HemisphereLight("#ffffff", "#444444", 1.1));
      const keyLight = new THREE.DirectionalLight("#ffffff", 1.5);
      keyLight.position.set(2.5, 4, 3);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight("#9A7BFF", 0.4);
      fillLight.position.set(-3, 1, -2);
      scene.add(fillLight);
      const rimLight = new THREE.DirectionalLight("#FFD84D", 0.35);
      rimLight.position.set(0, -2, -3);
      scene.add(rimLight);

      const group = new THREE.Group();
      scene.add(group);

      // Saturated prism palette (Ink & Signal Lime v2 — see DESIGN.md)
      const palette = {
        rose: new THREE.Color("#FF6F91"),
        ochre: new THREE.Color("#FFA14E"),
        wheat: new THREE.Color("#FFD84D"),
        sage: new THREE.Color("#35B6C9"),
        plum: new THREE.Color("#9A7BFF"),
      };

      const smoothstep = (a: number, b: number, x: number) => {
        const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };
      const lerpC = (out: THREE.Color, c: THREE.Color, k: number) => {
        out.r += (c.r - out.r) * k;
        out.g += (c.g - out.g) * k;
        out.b += (c.b - out.b) * k;
      };
      const prismAt = (tx: number, ty: number, tz: number, out: THREE.Color) => {
        out.copy(palette.rose);
        lerpC(out, palette.ochre, tx);
        lerpC(out, palette.wheat, ty);
        lerpC(out, palette.sage, 1 - tz);
        lerpC(out, palette.plum, smoothstep(0.45, 1.0, ty * tx));
      };

      const loader = new GLTFLoader();
      loader.load(
        "/models/brain.glb",
        (gltf) => {
          if (!mounted) return;
          const root = gltf.scene;

          // Compute combined bbox in model space first (before any rotation/scale).
          const sharedBox = new THREE.Box3().setFromObject(root);
          const sharedSize = new THREE.Vector3();
          sharedBox.getSize(sharedSize);
          const sharedMin = sharedBox.min;

          let meshCount = 0;
          const tmpV = new THREE.Vector3();
          const tmpC = new THREE.Color();

          root.traverse((o) => {
            const mesh = o as THREE.Mesh;
            if ((mesh as THREE.Object3D & { isMesh?: boolean }).isMesh && mesh.geometry) {
              meshCount += 1;
              const geom = mesh.geometry as THREE.BufferGeometry;
              geom.computeVertexNormals();

              const posAttr = geom.attributes.position as THREE.BufferAttribute;
              const colors = new Float32Array(posAttr.count * 3);

              mesh.updateMatrixWorld(true);
              const mw = mesh.matrixWorld;

              for (let i = 0; i < posAttr.count; i++) {
                tmpV.fromBufferAttribute(posAttr, i).applyMatrix4(mw);
                const tx = sharedSize.x > 0 ? (tmpV.x - sharedMin.x) / sharedSize.x : 0.5;
                const ty = sharedSize.y > 0 ? (tmpV.y - sharedMin.y) / sharedSize.y : 0.5;
                const tz = sharedSize.z > 0 ? (tmpV.z - sharedMin.z) / sharedSize.z : 0.5;
                prismAt(tx, ty, tz, tmpC);
                colors[i * 3 + 0] = tmpC.r;
                colors[i * 3 + 1] = tmpC.g;
                colors[i * 3 + 2] = tmpC.b;
              }

              geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));

              mesh.material = new THREE.MeshStandardMaterial({
                vertexColors: true,
                roughness: 0.35,
                metalness: 0.05,
                side: THREE.DoubleSide,
                flatShading: false,
              });
            }
          });

          if (meshCount === 0) return;

          // Orient: brainstem points down for this NIH GLB
          root.rotation.x = -Math.PI / 2;
          root.rotation.y = 0;
          root.rotation.z = 0;

          group.add(root);

          // Center + scale
          const box = new THREE.Box3().setFromObject(root);
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          root.position.sub(center);
          const maxDim = Math.max(size.x, size.y, size.z) || 1;
          const k = 2.4 / maxDim;
          root.scale.setScalar(k);
          root.position.multiplyScalar(k);
        },
        undefined,
        (err) => {
          console.error("[brain] load error:", err);
        },
      );

      const resize = () => {
        const w = stage.clientWidth;
        const h = stage.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener("resize", resize);

      // drag-to-rotate
      let dragging = false;
      let dragX = 0;
      let dragY = 0;
      let userYaw = 0;
      let userPitch = 0;
      const onDown = (e: PointerEvent) => {
        dragging = true;
        dragX = e.clientX;
        dragY = e.clientY;
      };
      const onUp = () => {
        dragging = false;
      };
      const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        userYaw += (e.clientX - dragX) * 0.005;
        userPitch += (e.clientY - dragY) * 0.005;
        userPitch = Math.max(-1.2, Math.min(1.2, userPitch));
        dragX = e.clientX;
        dragY = e.clientY;
      };
      canvas.addEventListener("pointerdown", onDown);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointermove", onMove);

      const clock = new THREE.Clock();
      const animate = () => {
        const t = clock.getElapsedTime();
        group.rotation.y = t * 0.35 + userYaw;
        group.rotation.x = Math.sin(t * 0.25) * 0.08 + userPitch;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
        canvas.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointermove", onMove);
        renderer.dispose();
      };
    })();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section className="relative">
      <div
        className="relative z-[3] mx-auto max-w-[1080px] text-center"
        style={{
          padding: "clamp(20px, 2.5vw, 36px) clamp(20px, 4vw, 40px) clamp(28px, 3.5vw, 48px)",
        }}
      >
        <div className="mb-4 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-[color:var(--ink-soft)] before:inline-block before:h-px before:w-[26px] before:bg-[color:var(--rule)] after:inline-block after:h-px after:w-[26px] after:bg-[color:var(--rule)]">
          {eyebrow}
        </div>

        <h1
          className="mx-auto font-medium text-[color:var(--ink)]"
          style={{
            fontSize: "clamp(40px, 5.4vw, 68px)",
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
          }}
        >
          {title}
          {titleAccent ? (
            <>
              <br />
              <span className="relative inline-block pb-[0.14em]">
                <span
                  className="font-display italic font-normal text-[color:var(--accent)]"
                  style={{ fontSize: "1.08em", lineHeight: 0.95, letterSpacing: "-0.005em" }}
                >
                  {titleAccent}
                </span>
              </span>
            </>
          ) : null}
        </h1>

        {ledeText ? (
          <p className="mx-auto mt-5 max-w-[50ch] text-[16.5px] font-normal leading-[1.6] text-[color:var(--ink-muted)]">
            {ledeText}
          </p>
        ) : null}

        {/* brain stage */}
        <div
          ref={stageRef}
          className="relative mx-auto mt-6 flex items-center justify-center"
          style={{ width: 440, height: 360, maxWidth: "100%" }}
          aria-hidden="true"
        >
          {/* floor shadow */}
          <div
            className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2 rounded-[50%]"
            style={{
              bottom: 8,
              width: 200,
              height: 14,
              background: "radial-gradient(ellipse at center, rgba(0,0,0,.55), transparent 70%)",
              filter: "blur(6px)",
            }}
          />

          {/* AI connection lines (behind brain) */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] overflow-visible"
            viewBox="0 0 440 360"
            preserveAspectRatio="none"
          >
            <g
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.55"
            >
              <path d="M 160 110 C 130 85, 95 65, 60 45" />
              <path d="M 220 95  C 218 65, 212 38, 220 18" />
              <path d="M 280 110 C 310 85, 345 65, 380 40" />
              <path d="M 305 165 C 350 158, 390 150, 420 142" />
              <path d="M 305 210 C 350 220, 385 234, 415 250" />
              <path d="M 230 250 C 234 285, 240 310, 230 332" />
              <path d="M 160 245 C 120 270, 85  292, 50  316" />
              <path d="M 135 180 C 95  185, 55  182, 18  175" />
            </g>
            {/* nodes */}
            <g fill="var(--accent)">
              <circle cx="60"  cy="45"  r="4" />
              <circle cx="220" cy="18"  r="3.6" />
              <circle cx="420" cy="142" r="3.6" />
              <circle cx="230" cy="332" r="3.6" />
              <circle cx="18"  cy="175" r="3.6" />
            </g>
            <g fill="var(--ink)" opacity="0.45">
              <circle cx="380" cy="40"  r="4" />
              <circle cx="415" cy="250" r="3.4" />
              <circle cx="50"  cy="316" r="3.6" />
            </g>
            {/* rings around the most "active" nodes — gentle pulse */}
            <g fill="none" stroke="var(--accent)" strokeWidth="1.4">
              <circle cx="60" cy="45" r="7.5" opacity="0.6">
                <animate
                  attributeName="r"
                  values="7;12;7"
                  dur="3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="420" cy="142" r="8" opacity="0.6">
                <animate
                  attributeName="r"
                  values="7.5;13;7.5"
                  dur="3.4s"
                  begin="0.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="3.4s"
                  begin="0.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="50" cy="316" r="7.5" opacity="0.6">
                <animate
                  attributeName="r"
                  values="7;11.5;7"
                  dur="2.8s"
                  begin="1.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2.8s"
                  begin="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>

          <canvas
            ref={canvasRef}
            className="relative z-[2] h-full w-full cursor-grab active:cursor-grabbing"
          />
        </div>

        {/* CTAs */}
        <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-3">
          <Link
            href={primaryHref}
            className="hero-cta-primary inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3.5 text-[15px] font-medium transition hover:-translate-y-px hover:shadow-[0_14px_30px_-16px_rgba(200,240,63,0.35)]"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--paper)",
            }}
          >
            {primaryLabel}
            <span
              className="font-display italic text-[19px] leading-none -translate-y-px"
              style={{ color: "var(--paper)" }}
            >
              →
            </span>
          </Link>
          <Link
            href={secondaryHref}
            className="hero-cta-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition"
            style={{
              backgroundColor: "transparent",
              color: "var(--ink)",
              border: "1px solid var(--ink)",
            }}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
