# Brain — visual reference

What separates a recognizable brain from a "lumpy sphere":

## 1. Bilateral symmetry
A brain is mirror-symmetric across its central plane. Random 3D noise breaks symmetry and instantly reads as "alien blob."
**Implementation:** sample noise with mirrored X — `snoise(vec3(abs(p.x), p.y, p.z) * freq)` — so left and right hemispheres are identical.

## 2. The longitudinal fissure (central cleft)
The single most recognizable feature: a deep groove down the middle of the top, separating the two hemispheres. About 60–70% as deep as the cortex thickness.
**Implementation:** subtract a Gaussian groove centered on x=0, but only on the top half — `exp(-pow(p.x*5.0, 2.0)) * smoothstep(-0.5, 0.7, p.y) * 0.20`.

## 3. The Sylvian fissure (lateral cleft)
A second deep groove that runs roughly horizontally on each lateral side, from front-low to back-mid. Defines the temporal lobe boundary.
**Implementation:** subtract a horizontal Gaussian on each side — applied where |x| is high.

## 4. Lobes give the silhouette its shape
- **Frontal pole** — bulges forward.
- **Occipital pole** — bulges backward and slightly down.
- **Temporal lobes** — hang lower on the sides.
- **Top is flatter** than a sphere (parietal).

The brain is *not* an ovoid — it's an asymmetric egg: longer front-to-back, wider in the middle, the back drops slightly, and the top flattens.
**Implementation:** anisotropic mesh scale (z > x > y) plus vertex-shader displacement that nudges back (negative z) outward and bottom-back (occipital pole) downward.

## 5. Larger, fewer gyri
Cortex wrinkles are NOT high-frequency noise — they're 5–8 cm wavelength. A brain has roughly 12–18 major gyri visible from any angle, not hundreds. Random noise with `freq=5` makes a golf-ball texture; brains want `freq=1.5–2.5` for primary folds, with smaller higher-frequency detail layered subtly.

## 6. Cerebellum
The "little brain" — a smaller, cauliflower-like structure attached at the back-bottom. **Distinctive feature:** parallel laminar ridges running horizontally (the folia), not random lumps. About 35–45% the size of the cerebrum.
**Implementation:** separate smaller mesh at (0, −0.5, −0.7), scale ~0.4. Use anisotropic noise — `snoise(vec3(p.x*15, p.y*3, p.z*15))` — so wrinkles run in horizontal bands.

## 7. Brain stem (optional)
A small cylindrical stem extending down from the cerebellum. Often omitted in stylized brain illustrations because it makes the form too anatomical / clinical. We'll skip it for the hero.

## 8. Surface texture
The cortex isn't smooth between gyri — there's a layer of fine micro-texture and tiny vessels. We won't add vessels (too literal), but a third high-frequency low-amplitude noise octave gives the surface "grip" without making it look stippled.

## 9. Color
Real brains are pinkish-grey. **We are not making a real brain** — the hero is illustrative. We'll keep the prismatic palette (rose / ochre / wheat / sage / plum) so it visually rhymes with the cube. The shape sells "brain"; the color sells "AI illustration."

## 10. Edge readability
Real 3D meshes lose silhouette against busy backgrounds. We use a fresnel rim that darkens edges to keep the brain crisp against the paper. Optional: a thin extruded back-faced ink shell for a hard outline (Toon style).

---

## Build order for v2

1. Bilateral-symmetric noise (mirror X).
2. Deep longitudinal fissure on the top.
3. Two lateral Sylvian fissures.
4. Anisotropic shape: bulge occipital (back), flatten parietal (top), drop temporal (sides-bottom).
5. Add a separate cerebellum mesh with laminar noise.
6. Keep the prismatic gradient + fresnel outline.
7. Slow tumble (continue).
