import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";

function AboutUs() {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-[#FDE9DA] mt-[58px] min-h-screen">
       

          {/* Team Members Section */}
          <div className="container mx-auto px-6 py-16 ">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#402916] mb-4">Developers များ </h2>
              <div className="w-54 h-1 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto mb-6"></div>
             
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 mb-16">
              {/* Team Member 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-[#4f3016]/10 h-[500px]">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white text-5xl font-bold">1</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4f3016] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🛠️</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4f3016] mb-3">Pai Min Thway</h3>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">2022-MIIT-CSE-002</p>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">Back-End Developer</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                  Focused on PHP backend development and database management. 
                  Implemented authentication systems and API endpoints.
                  
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">PHP</span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">MySQL</span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">API</span>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-[#4f3016]/10 h-[500px]">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white text-5xl font-bold">2</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4f3016] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🎨</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4f3016] mb-3">Khant Nyar Thwin</h3>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">2022-MIIT-CSE-018</p>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">Front-End Developer & UI/UX Designer</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                  Focused on UI/UX and frontend with React and Tailwind CSS. 
                  Designed in Figma and built responsive layouts.




                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                  <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">Figma</span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">React</span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">Tailwind CSS</span>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-8 text-center hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-[#4f3016]/10 h-[500px]">
                  <div className="relative mb-6">
                    <div className="w-36 h-36 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                      <span className="text-white text-5xl font-bold">3</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#4f3016] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">🖥️</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#4f3016] mb-3">Myat Mon Mon Zaw</h3>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">2022-MIIT-CSE-027</p>
                  <p className="text-[#8B4513] font-semibold mb-4 text-lg">Front-End Developer</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                  Focused on frontend using React and Tailwind CSS. 
                  Helped implement layouts and improve UI consistency.



                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">React</span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">Tailwind CSS</span>
                    <span className="inline-block bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">TypeScript</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Git Repository Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#402916] mb-4">Git Repository</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto mb-6"></div>
              <p className="text-xl text-[#402916] opacity-80 mx-auto">
                Explore our open-source project and contribute to the Lotus Shrine development
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative mb-16"
            >
              <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 border border-[#4f3016]/10">
                {/* Repository Icon */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg mb-4">
                    <span className="text-white text-3xl">📚</span>
                  </div>
                  <h3 className="text-3xl font-bold text-[#4f3016] mb-2">Lotus Shrine Repository</h3>
                  <p className="text-[#8B4513] font-semibold">Open Source Project</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Repository Information */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-xl font-bold text-[#4f3016] mb-6 flex items-center">
                      <span className="mr-3">📋</span>
                      Repository Information
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">Repository:</span>
                        <span className="text-[#4f3016] font-bold">Lotus Shrine</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">Platform:</span>
                        <span className="text-[#4f3016] font-bold flex items-center">
                          <span className="mr-2">🐙</span>
                          GitHub
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">Language:</span>
                        <span className="text-[#4f3016] font-bold">TypeScript, PHP</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">Framework:</span>
                        <span className="text-[#4f3016] font-bold">React + Vite</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/70 rounded-lg border border-[#4f3016]/5">
                        <span className="font-semibold text-gray-700">License:</span>
                        <span className="text-[#4f3016] font-bold">MIIT</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Features */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-xl font-bold text-[#4f3016] mb-6 flex items-center">
                      <span className="mr-3">✨</span>
                      Project Features
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">Responsive web design</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">User authentication system</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">Dynamic content management</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">Modern UI with animations</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">Database integration</span>
                      </div>
                      <div className="flex items-center p-3 bg-white/70 rounded-lg border border-[#4f3016]/5 hover:bg-white/90 transition-colors">
                        <span className="w-3 h-3 bg-gradient-to-r from-[#4f3016] to-[#8B4513] rounded-full mr-4"></span>
                        <span className="text-gray-700 font-medium">Cross-platform compatibility</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GitHub Button */}
                <div className="text-center mt-10">
                  <a 
                    href="https://github.com/KhantNyrrThwin/Lotus_Shrine" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-8 py-4 rounded-xl hover:from-[#8B4513] hover:to-[#4f3016] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    <span className="mr-3 text-2xl">🐙</span>
                    View Repository on GitHub
                    <span className="ml-3">→</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* About Lotus Shrine Section */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-[#402916] mb-4">About Lotus Shrine</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto mb-6"></div>
              <p className="text-xl text-[#402916] opacity-80 max-w-2xl mx-auto">
                Discover the story behind our spiritual digital platform and its mission
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="group relative mb-16"
            >
              <div className="bg-gradient-to-br from-white to-[#FDF5E6] rounded-2xl shadow-2xl p-10 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 border border-[#4f3016]/10">
                {/* Main Icon */}
                <div className="text-center mb-10">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#4f3016] to-[#8B4513] rounded-full flex items-center justify-center shadow-lg mb-6">
                    <span className="text-white text-4xl">🪷</span>
                  </div>
                  <h3 className="text-4xl font-bold text-[#4f3016] mb-3">Lotus Shrine</h3>
                  <p className="text-[#8B4513] font-semibold text-xl">Digital Sanctuary for Spiritual Growth</p>
                </div>

                {/* Main Description */}
                <div className="bg-white/50 rounded-xl p-8 border border-[#4f3016]/10 mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto mb-6">
                    Lotus Shrine is a modern web application designed to provide a digital platform for Buddhist teachings and meditation resources. 
                    Our team collaborated to create an intuitive, beautiful, and functional website that serves the spiritual community. 
                    The project combines cutting-edge frontend technologies with robust backend systems to deliver a seamless user experience.
                  </p>
                  <div className="w-32 h-0.5 bg-gradient-to-r from-[#4f3016] to-[#8B4513] mx-auto"></div>
                </div>

                {/* Mission and Vision Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Mission */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-2xl font-bold text-[#4f3016] mb-4 flex items-center">
                      <span className="mr-3 text-3xl">🎯</span>
                      Our Mission
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      To create a digital sanctuary that bridges ancient wisdom with modern technology, 
                      making Buddhist teachings and meditation practices accessible to everyone, 
                      regardless of their location or background.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="bg-white/50 rounded-xl p-6 border border-[#4f3016]/10">
                    <h4 className="text-2xl font-bold text-[#4f3016] mb-4 flex items-center">
                      <span className="mr-3 text-3xl">🌟</span>
                      Our Vision
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      To become the leading digital platform for spiritual growth, 
                      fostering a global community of practitioners and seekers 
                      who find peace, wisdom, and enlightenment through our resources.
                    </p>
                  </div>
                </div>

               

                {/* Call to Action */}
                <div className="text-center mt-10">
                  <a 
                    href="/koenawin" 
                    className="inline-flex items-center bg-gradient-to-r from-[#4f3016] to-[#8B4513] text-white px-8 py-4 rounded-xl hover:from-[#8B4513] hover:to-[#4f3016] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
                  >
                    <span className="mr-3 text-2xl">🪷</span>
                    Begin Your Journey
                    <span className="ml-3">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default AboutUs;
