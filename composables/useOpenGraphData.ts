export default async function useOpenGraphData(url: string): Promise<{ title?: string; description?: string; image?: string; link?: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');

    const ogTitle = doc.querySelector("meta[property='og:title']")?.getAttribute('content');
    const ogDescription = doc.querySelector("meta[property='og:description']")?.getAttribute('content');
    const ogImage = doc.querySelector("meta[property='og:image']")?.getAttribute('content');

    return {
      title: ogTitle || undefined,
      description: ogDescription || undefined,
      image: ogImage || undefined,
      link: url || undefined,
    };
  } catch (error) {
    console.error('Error fetching Open Graph data:', error);
    return null;
  }
}
