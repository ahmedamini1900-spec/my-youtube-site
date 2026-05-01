'use client';
import Image from 'next/image';

type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
    publishTime: string;
  };
};

export default function VideoCard({ video, onClick }: { video: Video; onClick: () => void }) {
  return (
    <div onClick={onClick} className="card-hover cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
      <div className="relative">
        <Image
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          width={320}
          height={180}
          className="w-full aspect-video object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium line-clamp-2 text-base leading-tight mb-2">
          {video.snippet.title}
        </h3>
        <p className="text-zinc-400 text-sm">{video.snippet.channelTitle}</p>
      </div>
    </div>
  );
}