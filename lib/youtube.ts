const API_KEY = process.env.YOUTUBE_API_KEY;

export async function searchVideos(query: string, maxResults = 16) {
  if (!API_KEY) throw new Error('YouTube API Key not configured');

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${maxResults}&q=${encodeURIComponent(query)}&key=${API_KEY}`;

  const res = await fetch(url, { next: { revalidate: 60 } }); // cache 60 ثانیه

  if (!res.ok) throw new Error('Failed to fetch videos');

  const data = await res.json();
  return data.items;
}

export function getVideoUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}