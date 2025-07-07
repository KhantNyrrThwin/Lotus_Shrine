import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Video data with id, title, and description
const videos = [
  {
    id: 'dyRsYk0LyA8',
    title: 'ဘလက်ပင့်',
    description: 'A guided meditation session for relaxation and mindfulness.'
  },
  {
    id: 'pFKxnb1_JkM',
    title: 'ကိုပိုင်',
    description: 'An inspiring Dhamma talk by a renowned teacher.'
  },
  {
    id: '3JZ_D3ELwOQ',
    title: 'Lotus Chanting',
    description: 'Traditional chanting for daily practice.'
  },
//   {
//     id: 'dqs4BgIicg',
//     title: 'Peaceful Meditation',
//     description: 'A guided meditation session for relaxation and mindfulness.'
//   },
  {
    id: 'ukEZyKdTOCE',
    title: 'Dhamma Talk',
    description: 'An inspiring Dhamma talk by a renowned teacher.'
  },
  {
    id: 'EtGzqyBbSzw',
    title: 'Lotus Chanting',
    description: 'Traditional chanting for daily practice.'
  },
];

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  playing: boolean;
  onPlay: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, description, playing, onPlay }) => (
  <div className="w-full flex flex-col items-center bg-amber-800 text-white rounded-lg shadow-md overflow-hidden">
    <div className="w-full aspect-video relative">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-t-lg border-none"
        />
      ) : (
        <div className="cursor-pointer w-full h-full relative" onClick={onPlay}>
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            className=" object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-black bg-opacity-60 rounded-full p-3">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="white">
                <polygon points="14,10 28,18 14,26" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-1 text-center">{title}</h2>
      <p className="text-white text-sm text-center">{description}</p>
    </div>
  </div>
);

const TayartawPage: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredVideos = videos.filter(
    v =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#4f3016] text-center mb-8">တရားတော်များ</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or description..."
            className="w-full max-w-md px-4 py-2 border border-amber-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No videos found.</div>
          ) : (
            filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                description={video.description}
                playing={playingId === video.id}
                onPlay={() => setPlayingId(video.id)}
              />
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TayartawPage;
