import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import tayartawVideos from "../data/tayartawVideos";

interface VideoCardProps {
  id: string;
  title: string;
  description: string;
  playing: boolean;
  onPlay: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, title, description, playing, onPlay }) => (
  <div className="group w-full flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100">
    <div className="w-full aspect-video relative overflow-hidden">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-none"
        />
      ) : (
        <div className="cursor-pointer w-full h-full relative group/play" onClick={onPlay}>
          <img
            src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover group-hover/play:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl group-hover/play:bg-white group-hover/play:scale-110 transition-all duration-300">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="#4f3016" className="ml-1">
                <polygon points="12,8 24,16 12,24" />
              </svg>
            </div>
          </div>
          
          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            Video
          </div>
        </div>
      )}
    </div>
    
    <div className="p-6 flex flex-col space-y-3">
      <h2 className="text-xl font-bold text-[#4f3016] text-center leading-tight group-hover:text-amber-700 transition-colors duration-300">
        {title}
      </h2>
      <p className="text-gray-600 text-sm text-center leading-relaxed line-clamp-3">
        {description}
      </p>
      
    </div>
  </div>
);

const TayartawPage: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filteredVideos = tayartawVideos.filter(
    v =>
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="bg-[#FDE9DA] w-full min-h-screen">
      <div className="lg:max-w-5xl 2xl:max-w-full mx-auto px-4 py-20 ">
        <h1 className="text-4xl md:text-4xl font-bold text-[#4f3016] text-center mb-8">တရားတော်များ</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="တရားတော်များရှာရန်..."
            className="w-full max-w-md px-4 py-2 border border-amber-900 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          {filteredVideos.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">Videos မတွေ့ပါ.</div>
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
      </div>
      <Footer />
    </>
  );
};

export default TayartawPage;
