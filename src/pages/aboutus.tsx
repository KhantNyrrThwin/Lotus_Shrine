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
        {/* Hero Section */}
        <div className="bg-[#4f3016] mt-[58px] min-h-screen">
          <div className="flex bg-[url('./assets/home.jpg')] bg-cover bg-center min-h-[500px] items-center justify-center">
            <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
              <h1 className="text-5xl font-bold mb-4">About Lotus Shrine</h1>
              <p className="text-xl">ကမ္ဘာ့ငြိမ်းချမ်းရေးနှင့် စိတ်တည်ငြိမ်မှုကို ရှာဖွေရာ</p>
              <p className="text-lg mt-2">Seeking World Peace and Inner Tranquility</p>
            </div>
          </div>
        </div>

      

        {/* History Section */}
        <div className="bg-[#f8f4f0] py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#4f3016] mb-4">Our Story</h2>
              <div className="w-24 h-1 bg-[#4f3016] mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-700 leading-relaxed mb-6">
                Founded with a vision to make Buddhist teachings accessible to everyone, Lotus Shrine began 
                as a small digital initiative to preserve and share the wisdom of ancient texts and practices. 
                What started as a simple website has grown into a comprehensive platform serving thousands 
                of spiritual seekers worldwide.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our journey has been guided by the principles of the Buddha's teachings - to reduce suffering, 
                promote understanding, and cultivate inner peace. We believe that in today's fast-paced world, 
                these timeless teachings are more relevant than ever.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through our digital platform, we continue to honor the tradition of sharing knowledge while 
                embracing modern technology to reach and serve our global community.
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#4f3016] mb-4">What We Offer</h2>
              <div className="w-24 h-1 bg-[#4f3016] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-[#f8f4f0] rounded-lg">
                <div className="w-16 h-16 bg-[#4f3016] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-[#4f3016] mb-3">Educational Resources</h3>
                <p className="text-gray-700">
                  Comprehensive guides, articles, and multimedia content about Buddhist philosophy, 
                  meditation techniques, and mindfulness practices.
                </p>
              </div>
              <div className="text-center p-6 bg-[#f8f4f0] rounded-lg">
                <div className="w-16 h-16 bg-[#4f3016] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🧘</span>
                </div>
                <h3 className="text-xl font-semibold text-[#4f3016] mb-3">Meditation Tools</h3>
                <p className="text-gray-700">
                  Guided meditation sessions, breathing exercises, and mindfulness practices 
                  designed for beginners and experienced practitioners alike.
                </p>
              </div>
              <div className="text-center p-6 bg-[#f8f4f0] rounded-lg">
                <div className="w-16 h-16 bg-[#4f3016] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-[#4f3016] mb-3">Community</h3>
                <p className="text-gray-700">
                  A supportive community of spiritual seekers, practitioners, and teachers 
                  sharing experiences and supporting each other's journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#4f3016] py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
              <div className="w-24 h-1 bg-white mx-auto"></div>
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-white mb-8">
                We welcome questions, suggestions, and feedback from our community. 
                Feel free to reach out to us for any inquiries about our services or 
                to share your spiritual journey with us.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                  <p className="text-white">info@lotusshrine.com</p>
                </div>
                <div className="bg-white bg-opacity-10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-white mb-2">Location</h3>
                  <p className="text-white">Myanmar, Southeast Asia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}

export default AboutUs;
