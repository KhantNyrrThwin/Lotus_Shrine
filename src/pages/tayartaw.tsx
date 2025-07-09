import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";

// Video data with id, title, and description
const videos = [
  {
    id: 'ZQYjadDutMk',
    title: 'စွန့်လွှတ်ခြင်းနှင့် ဆုတ်ကိုင်ခြင်းတရားတော်',
    description: ' ပါချုပ်ဆရာတော် ဘုရားကြီး '
  },
   {
    id: 'aI9JhtOOl3M',
    title: 'စိတ်သောကနည်းချင်ရင်သံယောဇဉ်လျော့ရမယ်',
    description: 'သစ္စာရွှေစည်ဆရာတော်'
  },
  {
    id: 'JKvJ0yQM1w8',
    title: 'ကုသိုလ်အစုံလုပ်ရင် ကံတွေတက်လာမယ်',
    description: 'ပါချုပ်ဆရာတော် ဘုရားကြီး'
  },
  
 {
    id: '2vtininwYtg',
    title: 'အပူမမိချင်ရင် မယူမိစေနဲ့ တွယ်တာမှုကို စွန့်လွှတ်မှုနဲ့ လျော့ချပါ',
    description: 'မနာပ ဒါယီကိုရီးယားဆရာတော်'
  },
  {
    id: 'Pi6Rql3iDfo',
    title: 'စိတ်ကောင်းလေးထားပေးပါ ဘယ်တော့မှ မဆင်းရဲဘူး တရားတော်',
    description: 'ပါချုပ်ဆရာတော် ဘုရားကြီး'
  },
  
 
  {
    id: 'bd9og0_Y8zM',
    title: 'အပြစ်တွေလဲမသယ်နဲ့အချစ်တွေလဲလွယ်မထားပါနဲ့',
    description: 'မနာပဒါရီကိုရီးယားဆရာတော်(အရှင်ဝိစိတ္တ).'
  },

  {
    id: 'MPawDElaoLA',
    title: 'လောကဓံနဲ့ကြုံတဲ့အခါ စိတ်ဓာတ်မကျစေနဲ့',
    description: 'ပါချုပ်ဆရာတော် ဘုရားကြီး'
  },
  {
    id: 'cOVkgDMeE1c',
    title: ' အဆင်မပြေရင် မညည်းရဘူး ​ပြန်ကြိုးစား',
    description: 'ပါချုပ်ဆရာတော် ဘုရားကြီး'
  },

  {
    id: 'DvhNBYAAXFs',
    title: 'လူသားစား ပေါရိသာဒ အကြောင်းတရားတော်',
    description: 'သစ္စာရွှေစည်ဆရာတော်'
  },

  {
    id: 'ZQYjadDutMk',
    title: 'စွန့်လွှတ်ခြင်းနှင့် ဆုတ်ကိုင်ခြင်းတရားတော်',
    description: 'The Law of Letting Go and Holding On'
  },
  {
    id: '71Fnc_eZU_Q',
    title: 'ယုတ်မာသောနည်းလမ်းများနှင့် ဒေဝဒတ်',
    description: 'ဒယ်အိုးဆရာတော်'
  },
  {
    id: 'D0dVzGttpj4',
    title: 'မိဘမျက်ရည်တစ်စက် သားသမီးဒုက္ခတစ်သက်',
    description: 'သစ္စာရွှေစည်ဆရာတော်'
  },

  {
    id: 'fDcI_dTcmtM',
    title: 'သူများအကြောင်းစိတ်မဝင်စားနဲ့',
    description: 'သစ္စာရွှေစည်ဆရာတော်'
  },

  {
    id: '4e1tEfHgYp4',
    title: 'ကိုယ်ပြုသည့်ကံ ကိုယ့်ထံပြန်မည်',
    description: 'ဆရာတော်အရှင်သုစိတ္တ(မော်ကျွန်း)'
  },

  {
    id: 'kDNohVi8jhE',
    title: 'တပါးအပေါ် စကားလက်လွတ်စပါယ် မပြောမိပါစေနဲ့',
    description: 'အရှင်သုစိတ္တ (မော်ကျွန်းဆရာတော်)'
  },
  {
    id: 'D_C_Wto0NMs&',
    title: 'ကြေကွဲကွဲစရာတွေဝေးပါစေ',
    description: 'အရှင်သုစိတ္တ (မော်ကျွန်းဆရာတော်)'
  },
  
  {
    id: '721IvLZv9bA',
    title: 'ဖြစ်ချင်တာ ဖြစ်ခွင့်မရတဲ့ဘဝမှာ စိတ်ထားတက်စေဖို့နည်းလမ်း',
    description: 'မနာပဒါရီကိုရီးယားဆရာတော်(အရှင်ဝိစိတ္တ)'
  },
 
  {
    id: 'Fmfkl-W5xvY',
    title: 'နောင်တ',
    description: 'အရှင်သုစိတ္တ (မော်ကျွန်းဆရာတော်)'
  },

  {
    id: 'GMtVcheqNwU',
    title: 'နေ့ခံညစံ ပြိတ္တာကြီး အကြောင်း',
    description: 'ပါချုပ်ဆရာတော် ဘုရားကြီး'
  },
  
//   {
//     id: 'dqs4BgIicg',
//     title: 'Peaceful Meditation',
//     description: 'A guided meditation session for relaxation and mindfulness.'
//   },
  {
    id: 'HR05_HGDtlY',
    title: 'ချစ်မိလျှင် အပြစ်မမြင်နိုင်လို့ မစွန့်လွှတ်နိုင်တာပါ(သစ္စာရွှေစည်ဆရာတော်)',
    description: 'သစ္စာရွှေစည်ဆရာတော်'
  },
  {
    id: 'ycXrVJimWkE',
    title: 'လေးသင်္ချေနဲ့ကမ္ဘာတစ်သိန်းရဲ့အဓိပ္ပာယ်ကဘာလဲ ',
    description: 'ပါချုပ်ဆရာတော် ဘုရားကြီး'
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
