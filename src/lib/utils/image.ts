export function createBlurDataUrl(label = "SP") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#27272a" />
          <stop offset="100%" stop-color="#d4a574" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill="url(#g)" />
      <text x="24" y="28" font-size="14" text-anchor="middle" fill="#fafafa" font-family="Arial, sans-serif">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
