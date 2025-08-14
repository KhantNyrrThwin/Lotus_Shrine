import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import { 
  Search, 
  MapPin, 
  Share2, 
  Info,
  X,
  Camera,
  Eye
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Pagoda {
  id: number;
  name: string;
  nameMyanmar: string;
  location: string;
  description: string;
  descriptionMyanmar: string;
  image: string;
  category: string;
  features: string[];
}

const pagodas: Pagoda[] = [
  {
    id: 1,
    name: "Maha Myat Muni Temple ",
    nameMyanmar: "မဟာမုနိ ရုပ်ရှင်တော်မြတ်ကြီး",
    location: "Mandalay, Myanmar",
    description: "မဟာမုနိ ရုပ်ရှင်တော်ကား ကမ္ဘာက လေးစားရသော သမိုင်းဝင် ရုပ်ပွားတော် တစ်ဆူဖြစ်ပါသည်။ မန္တလေးမြို့၏ ကျက်သရေဆောင် အဓိကရ ထင်ရှားသော ဘုရားတစ်ဆူလည်း ဖြစ်သည်။",
    descriptionMyanmar: "မဟာမုနိ ရုပ်ရှင်တော်မြတ်ကြီး သည် မြန်မာနိုင်ငံ၊ မန္တလေးတိုင်းဒေသကြီး၊ မန္တလေးမြို့တွင် တည်ရှိသည်။ မန္တလေး မဟာမုနိ ဘုရား ကို မဟာမြတ်မုနိဟူ၍ လည်းကောင်း၊ ဘုရားကြီးဟူ၍ လည်းကောင်းခေါ်ကြသည်။",
    image: "/src/assets/MaharMyatMuNi/Main.jpg",
    category: "Sacred",
    features: ["Golden Plates", "Diamond Umbrella", "Historical", "Sacred Relics"]
  },
  {
    id: 2,
    name: "Mahar Ankhtoo Kanthar Pagoda",
    nameMyanmar: "မဟာအံ့ထူးကံသာ မြတ်စွာဘုရား ",
    location: "Pyin Oo Lwin, Myanmar",
    description: "",
    descriptionMyanmar: "မန္တလေးမြို့ အောင်သီဟကျောက်ဆစ်လုပ်ငန်းမှ ဦးသောင်းထွန်း၊ ဒေါ်မမလေးတို့က ဉာဏ်တော်အမြင့် ၁၅ ပေ၊ ဒူးခေါင်းတော်အကျယ် ၈ ပေ ၆ လက်မနှင့် အလေးချိန် ၁၇ တန်ခန့်ရှိ ဆင်းတုတော်ကြီးကို ရွှေလီမြို့သို့ ပင့်ဆောင်ရန် မော်တော်ယာဉ်ဖြင့် မန္တလေးမှ သယ်ဆောင်လာစဉ် ပြင်ဦးလွင်မြို့နယ် ရေငယ်ကျေးရွာအလွန် မန္တလေး-လားရှိုးကားလမ်း မိုင်တိုင် ၄၇/၁ အရောက်တွင် မော်တော်ယာဉ်တိမ်းမှောက်ပြီး ဆင်းတုတော်ကြီးမှာ ကားပေါ်မှကျ၍ မြေခခဲ့သည်။ ဆင်းတုတော်ကြီး မြေခသည့်ရက်မှာ မြန်မာသက္ကရာဇ် ၁၃၅၈ ခုနှစ် တပေါင်းလပြည့်ကျော် ၁၄ ရက်နေ့ (၁၉၉၇ ခုနှစ် ဧပြီလ ၆ ရက်) တနင်္ဂနွေနေ့ ၁၁ နာရီအချိန်ခန့်ဖြစ်သည်။ ဆင်းတုတော်ကြီးအား ရွှေလီမြို့သို့ ဆက်လက်ပင့်ဆောင်ခြင်းမပြုတော့ပဲ အများလှူဒါန်းငွေ ၈၀၀,၀၀၀ ကျပ် နှင့် ထုလုပ်သူက လှူဒါန်းငွေ ၂၀၀,၀၀၀ ကျပ်၊ စုစုပေါင်း ၁,၀၀၀,၀၀၀ ကျပ်ဖြင့် ကျောက်ဆစ်လုပ်ငန်းရှင်အား ပေးချေ၍ လက်ရှိနေရာတွင် ပူဇော်ရန် ဆောင်ရွက်ခဲ့သည်။",
    image: "/src/assets/Mahar/Main.jpg",
    category: "Natural Wonder",
    features: ["Golden Rock", "Mountain View", "Pilgrimage", "Natural Beauty"]
  },
  {
    id: 3,
    name: "Kuthodaw Pagoda",
    nameMyanmar: "ကုသိုလ်တော် ဘုရား",
    location: "Mandalay, Myanmar",
    description: "မြန်မာသက္ကရာဇ် ၁၂၃၀ ကဆုန်လဆန်း ၁ ရက်နေ့တွင်-ဝိနည်း ၅ ကျမ်း ပါဠိတော်က ချပ်ရေ ၁၁၁ ချပ် / အဘိဓမ္မာ ၇ ကျမ်း ပါဠိတော်က ချပ်ရေ ၂၀၈ ချပ်နိကာယ် ၅ ကျမ်း၊ သုတ် ၃ ကျမ်း ပါဠိတော်က ချပ်ရေ ၄၁၀ ချပ် စုစုပေါင်း ကျောက်စာချပ်ရေ ၇၂၉ ချပ် အတွက် ဓမ္မစေတီ ၇၂၉ဆူကို ထုလုပ် ဝန်းရံတည်ထားခဲ့သည်။ ကျောက်စာများရေ များတဲ့ဘုရားဖြစ်သောကြောင့် ကမ္ဘာ့အကြီးဆုံးစာအုပ် ဟုတင်စားရေးသားကြသည်။",
    descriptionMyanmar: "ကုသိုလ်တော်ဘုရား သည် မန္တလေးတောင်၏ အရှေ့တောင်ဘက်တွင် တည်ရှိပြီး မင်းတုန်းမင်း၏ ကုသိုလ်တော် ဖြစ်သည်။ မြန်မာသက္ကရာဇ် ၁၂၂၄ ဝါဆိုလတွင် မင်းတုန်းမင်း တည်ထားကိုးကွယ်ခဲ့သော ဘုရားဖြစ်ပြီး ဘွဲ့အမည်မှာ မဟာလောကမာရဇိန် ဖြစ်သည်။ တံတိုင်း ၃ ထပ်ရှိပြီး ဖိနပ်ခင်းအချင်း သံတောင် ၆၅၊ အရပ်တော် သံတောင် ၅၀၊ ၁ မိုက် ၄ သစ်ရှိသည်။",
    image: "/src/assets/KuToTaw/Main.jpg",
    category: "Historical",
    features: ["World's Largest Book", "Educational", "Marble Slabs", "Scriptures"]
  },
  {
    id: 4,
    name: "",
    nameMyanmar: "အောင်တော်မူဘုရား",
    location: "Bagan, Myanmar",
    description: "Ancient city with over 2,000 Buddhist temples, pagodas, and monasteries from the 9th to 13th centuries.",
    descriptionMyanmar: "ရှေးဟောင်းမြို့တော်ဖြစ်ပြီး ဘုရားများ၊ စေတီများနှင့် ကျောင်းများ ၂၀၀၀ ကျော် ပါဝင်သော ဘုရားများဖြစ်သည်။",
    image: "/src/assets/KoeNaWinPagoda.png",
    category: "Ancient",
    features: ["Ancient Temples", "Sunrise View", "Historical", "UNESCO Site"]
  },
  {
    id: 5,
    name: "Sule Pagoda",
    nameMyanmar: "ဆူးလေဘုရား",
    location: "Yangon, Myanmar",
    description: "Ancient pagoda located in the heart of Yangon, surrounded by modern city life.",
    descriptionMyanmar: "ရန်ကုန်မြို့လယ်တွင် တည်ရှိသော ရှေးဟောင်းဘုရားဖြစ်ပြီး ခေတ်မီမြို့ပြဘဝဖြင့် ဝန်းရံထားသည်။",
    image: "/src/assets/KoeNaWinPagoda.png",
    category: "City Center",
    features: ["City Center", "Accessible", "Historical", "Urban"]
  },

];

const categories = [
  { id: "all", name: "အားလုံး", nameEn: "All" },
  { id: "sacred", name: "အထွတ်အမြတ်", nameEn: "Sacred" },
  { id: "historical", name: "သမိုင်း", nameEn: "Historical" },
  { id: "ancient", name: "ရှေးဟောင်း", nameEn: "Ancient" },
  { id: "natural", name: "သဘာဝ", nameEn: "Natural" },
  { id: "city", name: "မြို့ပြ", nameEn: "City" }
];

export default function Pagodas() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPagoda, setSelectedPagoda] = useState<Pagoda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Animations
    const tl = gsap.timeline();

    // Header animation
    tl.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Cards stagger animation
    gsap.fromTo(".pagoda-card",
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Category buttons animation
    gsap.fromTo(".category-btn",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".categories-section",
          start: "top 80%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const filteredPagodas = pagodas.filter(pagoda => {
    const matchesCategory = selectedCategory === "all" || 
      pagoda.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = pagoda.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pagoda.nameMyanmar.includes(searchTerm) ||
      pagoda.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (pagoda: Pagoda) => {
    setSelectedPagoda(pagoda);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPagoda(null);
  };

  const sharePagoda = async (pagoda: Pagoda) => {
    const shareData = {
      title: `${pagoda.nameMyanmar} - ${pagoda.name}`,
      text: `${pagoda.descriptionMyanmar}\n\n${pagoda.description}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        // You can add a toast notification here
        console.log("Pagoda information copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        console.log("Pagoda information copied to clipboard!");
      } catch (clipboardError) {
        console.error("Clipboard error:", clipboardError);
        console.error("Failed to share pagoda information");
      }
    }
  };

  const takeScreenshot = async () => {
    try {
      console.log("Taking screenshot...");
      
      // Use html2canvas to capture the modal content
      const html2canvas = (await import('html2canvas')).default;
      
      // Try multiple selectors to find the modal content
      let modalContent = document.getElementById('pagoda-modal-content') as HTMLElement;
      
      if (!modalContent) {
        // Try class selector
        modalContent = document.querySelector('.modal-content') as HTMLElement;
      }
      
      if (!modalContent) {
        // Try alternative selectors
        modalContent = document.querySelector('[class*="modal"]') as HTMLElement;
      }
      
      if (!modalContent) {
        // Try finding by motion.div with specific classes
        modalContent = document.querySelector('.bg-white.rounded-2xl.max-w-4xl') as HTMLElement;
      }
      
      if (!modalContent) {
        // Last resort: try to find any modal-like element
        const modalElements = document.querySelectorAll('div');
        for (const element of modalElements) {
          if (element.classList.contains('bg-white') && 
              element.classList.contains('rounded-2xl') && 
              element.style.position === 'relative') {
            modalContent = element as HTMLElement;
            break;
          }
        }
      }
      
      console.log("Modal content found:", modalContent);
      
      if (!modalContent) {
        console.error("Modal content not found with any selector");
        // Fallback to email without screenshot
        sendEmailWithoutScreenshot();
        return;
      }
      
      // Create a completely isolated iframe to avoid any CSS inheritance
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '800px';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      
      document.body.appendChild(iframe);
      
      // Write content to iframe with isolated styles
      iframe.contentDocument!.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 40px;
              font-family: Arial, sans-serif;
              background-color: #ffffff;
              color: #000000;
            }
            .container {
              background-color: #ffffff;
              border-radius: 16px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.1);
              padding: 40px;
              max-width: 720px;
            }
            .header h2 {
              font-size: 28px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 8px;
              margin-top: 0;
            }
            .header p {
              font-size: 18px;
              color: #6b7280;
              margin-bottom: 8px;
            }
            .location {
              display: flex;
              align-items: center;
              color: #6b7280;
              font-size: 14px;
            }
            .section {
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
              margin-bottom: 20px;
            }
            .section h3 {
              font-size: 20px;
              font-weight: bold;
              color: #1f2937;
              margin-bottom: 12px;
              margin-top: 0;
            }
            .section p {
              color: #374151;
              line-height: 1.6;
              margin-bottom: 12px;
            }
            .section p:last-child {
              color: #6b7280;
            }
            .feature-tag {
              background-color: #fef3c7;
              color: #92400e;
              padding: 4px 8px;
              border-radius: 12px;
              font-size: 12px;
              margin-right: 8px;
              margin-bottom: 4px;
              display: inline-block;
            }
            .footer {
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
              margin-top: 20px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>${selectedPagoda?.nameMyanmar}</h2>
              <p>${selectedPagoda?.name}</p>
              <div class="location">📍 ${selectedPagoda?.location}</div>
            </div>
            
            <div class="section">
              <h3>ဖော်ပြချက်</h3>
              <p>${selectedPagoda?.descriptionMyanmar}</p>
              <p>${selectedPagoda?.description}</p>
            </div>
            
            <div class="section">
              <h3>အသေးစိတ်အချက်အလက်များ</h3>
              <div style="margin-bottom: 12px;">
                <span style="font-weight: bold; color: #1f2937;">အမျိုးအစား:</span>
                <span style="color: #6b7280; margin-left: 8px;">${selectedPagoda?.category}</span>
              </div>
              <div>
                <span style="font-weight: bold; color: #1f2937;">ထူးခြားချက်များ:</span>
                <div style="margin-top: 8px;">
                  ${selectedPagoda?.features.map(feature => 
                    `<span class="feature-tag">${feature}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
            
            <div class="footer">
              Shared from Lotus Shrine App
            </div>
          </div>
        </body>
        </html>
      `);
      
      iframe.contentDocument!.close();
      
      // Wait for iframe to load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(iframe.contentDocument!.body, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      });
      
      // Remove the iframe
      document.body.removeChild(iframe);
      
      console.log("Canvas created:", canvas);
      
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          console.log("Blob created:", blob);
          await sendEmailWithScreenshot(blob);
        } else {
          console.error("Failed to create blob");
          sendEmailWithoutScreenshot();
        }
      }, 'image/png', 0.9);
      
    } catch (error) {
      console.error("Error taking screenshot:", error);
      // Fallback to email without screenshot
      sendEmailWithoutScreenshot();
    }
  };

  const sendEmailWithScreenshot = async (blob: Blob) => {
    try {
      console.log("Sending email with screenshot...");
      
      // Create email content
      const subject = encodeURIComponent(`${selectedPagoda?.nameMyanmar} - ${selectedPagoda?.name}`);
      const body = encodeURIComponent(`
${selectedPagoda?.descriptionMyanmar}

${selectedPagoda?.description}

Location: ${selectedPagoda?.location}
Category: ${selectedPagoda?.category}

Features: ${selectedPagoda?.features.join(', ')}

---
Shared from Lotus Shrine App
      `);
      
      // Create mailto link
      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
      
      console.log("Opening email client...");
      
      // Open email client
      window.open(mailtoLink, '_blank');
      
      // Also provide download option for manual attachment
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedPagoda?.name.replace(/\s+/g, '-')}-details.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      // Email sent successfully with screenshot
    } catch (error) {
      console.error("Error sending email:", error);
              // Fallback: just download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedPagoda?.name.replace(/\s+/g, '-')}-details.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
  };

  const sendEmailWithoutScreenshot = () => {
    try {
      console.log("Sending email without screenshot...");
      
      // Create email content
      const subject = encodeURIComponent(`${selectedPagoda?.nameMyanmar} - ${selectedPagoda?.name}`);
      const body = encodeURIComponent(`
${selectedPagoda?.descriptionMyanmar}

${selectedPagoda?.description}

Location: ${selectedPagoda?.location}
Category: ${selectedPagoda?.category}

Features: ${selectedPagoda?.features.join(', ')}

---
Shared from Lotus Shrine App
      `);
      
      // Create mailto link
      const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink, '_blank');
    } catch (error) {
      console.error("Error sending email:", error);
      console.error("Failed to open email client");
    }
  };

  const takeScreenshotForDownload = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const modalContent = document.querySelector('.modal-content') as HTMLElement;
      
      if (modalContent) {
        const canvas = await html2canvas(modalContent, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true
        });
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${selectedPagoda?.name.replace(/\s+/g, '-')}-details.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            console.log("Screenshot downloaded successfully!");
          }
        }, 'image/png');
      }
    } catch (error) {
      console.error("Error taking screenshot:", error);
              console.error("Failed to take screenshot");
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      
      {/* Hero Section */}
      <div ref={headerRef} className="pt-20 pb-16 bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            ဘုရားများ
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Discover the sacred pagodas and temples of Myanmar
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search pagodas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-64"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section py-8 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`category-btn transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? "bg-amber-600 text-white shadow-lg scale-105" 
                    : "hover:bg-amber-50 hover:border-amber-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="font-semibold">{category.name}</span>
                <span className="text-xs ml-1 opacity-70">({category.nameEn})</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Pagodas Grid */}
      <div ref={cardsRef} className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPagodas.map((pagoda) => (
            <motion.div
              key={pagoda.id}
              className="pagoda-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
              onClick={() => openModal(pagoda)}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pagoda.image}
                  alt={pagoda.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {pagoda.category}
                </div>

                {/* Share Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          sharePagoda(pagoda);
                        }}
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                      >
                        <Share2 className="w-5 h-5 text-gray-600" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share this pagoda</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {pagoda.nameMyanmar}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{pagoda.name}</p>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {pagoda.location}
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {pagoda.descriptionMyanmar}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {pagoda.features.slice(0, 3).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>



                {/* View Details Button */}
                <Button 
                  className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(pagoda);
                  }}
                >
                  <Info className="w-4 h-4 mr-2" />
                  အသေးစိတ်ကြည့်ရှုရန်
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPagodas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No pagodas found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPagoda && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
                         id="pagoda-modal-content"
             className="modal-content bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img
                src={selectedPagoda.image}
                alt={selectedPagoda.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
                             <button
                 onClick={closeModal}
                 className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="p-8">
                             <div className="flex items-start justify-between mb-6">
                 <div>
                   <h2 className="text-3xl font-bold text-gray-800 mb-2">
                     {selectedPagoda.nameMyanmar}
                   </h2>
                   <p className="text-lg text-gray-600 mb-2">{selectedPagoda.name}</p>
                   <div className="flex items-center text-gray-500">
                     <MapPin className="w-5 h-5 mr-2" />
                     {selectedPagoda.location}
                   </div>
                 </div>
               </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">ဖော်ပြချက်</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {selectedPagoda.descriptionMyanmar}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedPagoda.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">အသေးစိတ်အချက်အလက်များ</h3>
                  
                                     <div className="space-y-4">
                     <div className="flex items-center">
                       <Camera className="w-5 h-5 text-amber-600 mr-3" />
                       <div>
                         <p className="font-semibold text-gray-800">အမျိုးအစား</p>
                         <p className="text-gray-600">{selectedPagoda.category}</p>
                       </div>
                     </div>
                   </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 mb-3">ထူးခြားချက်များ</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPagoda.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

                             <div className="flex gap-4 mt-8">
                 <Button 
                   className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                   onClick={() => {
                     // Try screenshot first, fallback to email without screenshot
                     takeScreenshot().catch(() => {
                       console.log("Screenshot failed, using email fallback");
                       sendEmailWithoutScreenshot();
                     });
                   }}
                 >
                   <Share2 className="w-4 h-4 mr-2" />
                   မျှဝေရန်
                 </Button>
                 <Button 
                   variant="outline"
                   className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50"
                   onClick={() => {
                     // Handle visit/pay respect action
                     console.log(`ဖူးမျှော်ရန်: ${selectedPagoda?.nameMyanmar}`);
                   }}
                 >
                   <Eye className="w-4 h-4 mr-2" />
                   ဖူးမျှော်ရန်
                 </Button>
               </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
