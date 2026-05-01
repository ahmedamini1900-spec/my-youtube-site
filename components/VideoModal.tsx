'use client';
import { X } from 'lucide-react';

type Props = {
  videoId: string | null;
  onClose: () => void;
};

export default function VideoModal({ videoId, onClose }: Props) {
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl bg-zinc-900 rounded-3xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black p-2 rounded-full"
        >
          <X size={28} />
        </button>
        <div className="aspect-video bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allowFullScreen
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}