'use client';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import VideoModal from '../components/VideoModal';
import { searchVideos } from '../lib/youtube';

type VideoItem = any;

export default function Home() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const handleSearch = async (q: string) => {
    setQuery(q);
    setLoading(true);
    try {
      const results = await searchVideos(q);
      setVideos(results);
    } catch (err) {
      console.error(err);
      alert('خطا در دریافت ویدیوها');
    }
    setLoading(false);
  };

  useEffect(() => {
    handleSearch('music');
  }, []);

  return (
    <main className="min-h-screen pb-20">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight neon-purple">NovaPlay</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">دنیای ویدیوهای بی‌نهایت</h2>
          <p className="text-zinc-400 text-xl">هر چیزی که بخوای، اینجا پیدا می‌شه</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        <div className="mt-12">
          {query && <h3 className="text-2xl font-semibold mb-6">نتایج جستجو برای «{query}»</h3>}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-zinc-900 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id.videoId}
                  video={video}
                  onClick={() => setSelectedVideo(video.id.videoId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <VideoModal videoId={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </main>
  );
}
