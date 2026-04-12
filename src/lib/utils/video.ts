export type VideoProvider = "youtube" | "vimeo" | "loom" | "other";

export function detectVideoProvider(url: string): VideoProvider {
  if (!url) return "other";
  if (/youtube\.com|youtu\.be/i.test(url)) return "youtube";
  if (/vimeo\.com/i.test(url)) return "vimeo";
  if (/loom\.com/i.test(url)) return "loom";
  return "other";
}

export function getEmbedUrl(url: string, provider?: string): string {
  if (!url) return "";

  switch (provider) {
    case "youtube": {
      const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/,
      );
      return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    }
    case "vimeo": {
      const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      return match ? `https://player.vimeo.com/video/${match[1]}` : url;
    }
    case "loom": {
      const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
      return match ? `https://www.loom.com/embed/${match[1]}` : url;
    }
    default:
      return url;
  }
}
