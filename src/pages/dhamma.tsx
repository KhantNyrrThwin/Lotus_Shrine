import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { mantras } from "../data/mantras"
import { useNavigate } from "react-router-dom"
import { useMusicPlayer } from "@/components/MusicPlayerContext"
import { Play, ChevronDown, ChevronUp, Search } from "lucide-react"
import { useState } from "react"

function Dhamma() {
  const navigate = useNavigate();
  const { playSong } = useMusicPlayer();
  const [openSections, setOpenSections] = useState(() => {
    // All sections open by default
    const initial: Record<string, boolean> = {};
    mantras.forEach(m => { initial[m.section] = true });
    return initial;
  });
  const [search, setSearch] = useState("");

  // Group mantras by section
  const sections = mantras.reduce((acc, mantra) => {
    if (!acc[mantra.section]) acc[mantra.section] = [];
    acc[mantra.section].push(mantra);
    return acc;
  }, {} as Record<string, typeof mantras>);

  // Filter sections and mantras by search
  const filteredSections = Object.entries(sections)
    .filter(([section, mantras]) => {
      const sectionMatch = section.toLowerCase().includes(search.toLowerCase());
      const mantraMatch = mantras.some(m => m.title.toLowerCase().includes(search.toLowerCase()));
      return sectionMatch || mantraMatch;
    })
    .map(([section, mantras]) => [
      section,
      mantras.filter(m =>
        section.toLowerCase().includes(search.toLowerCase()) ||
        m.title.toLowerCase().includes(search.toLowerCase())
      )
    ] as [string, typeof mantras]);

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col py-20 min-h-screen bg-[#FDE9DA] relative">
        <div className="absolute inset-0 pointer-events-none bg-[url('/src/assets/features_background.jpg')] bg-cover bg-center opacity-10" />
        <h1 className="text-4xl font-extrabold text-center mb-8 text-brown-700 drop-shadow-lg">ဘုရားရှိခိုးနှင့် ဂါတာတော်များ</h1>
        <div className="max-w-3xl mx-auto w-full z-10 relative">
          <div className="flex items-center mb-8 gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search section or mantra..."
                className="w-full px-4 py-2 rounded-full border border-brown-100 shadow focus:outline-none focus:ring-2 focus:ring-brown-200 bg-white/80 text-brown-800 transition-all duration-200 focus:shadow-lg"
              />
              <Search className="absolute right-3 top-2.5 text-brown-300" size={20} />
            </div>
          </div>
          <div className="space-y-8">
            {filteredSections.map(([section, mantras]) => (
              <div key={section} className="bg-[#9c6235] rounded-2xl shadow-lg border border-brown-100 transition-all duration-200 hover:shadow-2xl">
                <button
                  className="w-full flex items-center text-white justify-between px-6 py-4 text-xl font-bold text-brown-600 focus:outline-none hover:bg-brown-100/70 rounded-t-2xl transition-all duration-200 group"
                  onClick={() => toggleSection(section)}
                >
                  <span className="group-hover:scale-105 transition-transform duration-200">{section}</span>
                  {openSections[section] ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
                {openSections[section] && (
                  <div className="flex flex-col gap-6 px-6 pb-6">
                    {mantras.map((mantra) => (
                      <div key={mantra.id} className="bg-white/90 rounded-xl shadow p-4 flex flex-col sm:flex-row items-center justify-between border border-brown-100 hover:scale-[1.02] hover:shadow-xl transition-all duration-200">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-brown-800 mb-2 text-center sm:text-left">{mantra.title}</h3>
                        </div>
                        <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-6">
                          <button
                            className="flex items-center cursor-pointer gap-1 px-4 py-2 bg-gradient-to-r from-brown-100 to-brown-200 rounded-full shadow text-brown-800 font-medium transition-all duration-200 hover:from-brown-200 hover:to-brown-100 hover:scale-105 hover:shadow-lg hover:text-white hover:bg-[#bfa074]"
                            onClick={() => playSong({
                              id: Number(mantra.id),
                              title: mantra.title,
                              artist: mantra.artist,
                              duration: mantra.duration,
                              audioUrl: mantra.audio
                            })}
                          >
                            <Play size={18} />
                            Play
                          </button>
                          <button
                            className="px-4 py-2 bg-brown-100 hover:bg-brown-200 rounded-full shadow text-brown-700 cursor-pointer font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:text-white hover:bg-[#bfa074]"
                            onClick={() => navigate(`/mantra/${mantra.id}`)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {filteredSections.length === 0 && (
              <div className="text-center text-brown-500 py-12 text-lg">No mantras or sections found.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Dhamma
