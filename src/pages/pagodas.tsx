import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

// Tailwind-only page (no external animation libs)

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
    id: 3,
    name: "",
    nameMyanmar: "ကုသိုလ်တော် ဘုရား",
    location: "မန္တလေးမြို့",
    description: "မြန်မာသက္ကရာဇ် ၁၂၃၀ ကဆုန်လဆန်း ၁ ရက်နေ့တွင်-ဝိနည်း ၅ ကျမ်း ပါဠိတော်က ချပ်ရေ ၁၁၁ ချပ် / အဘိဓမ္မာ ၇ ကျမ်း ပါဠိတော်က ချပ်ရေ ၂၀၈ ချပ်နိကာယ် ၅ ကျမ်း၊ သုတ် ၃ ကျမ်း ပါဠိတော်က ချပ်ရေ ၄၁၀ ချပ် စုစုပေါင်း ကျောက်စာချပ်ရေ ၇၂၉ ချပ် အတွက် ဓမ္မစေတီ ၇၂၉ဆူကို ထုလုပ် ဝန်းရံတည်ထားခဲ့သည်။ ကျောက်စာများရေ များတဲ့ဘုရားဖြစ်သောကြောင့် ကမ္ဘာ့အကြီးဆုံးစာအုပ် ဟုတင်စားရေးသားကြသည်။",
    descriptionMyanmar: "ကုသိုလ်တော်ဘုရား သည် မန္တလေးတောင်၏ အရှေ့တောင်ဘက်တွင် တည်ရှိပြီး မင်းတုန်းမင်း၏ ကုသိုလ်တော် ဖြစ်သည်။ မြန်မာသက္ကရာဇ် ၁၂၂၄ ဝါဆိုလတွင် မင်းတုန်းမင်း တည်ထားကိုးကွယ်ခဲ့သော ဘုရားဖြစ်ပြီး ဘွဲ့အမည်မှာ မဟာလောကမာရဇိန် ဖြစ်သည်။ တံတိုင်း ၃ ထပ်ရှိပြီး ဖိနပ်ခင်းအချင်း သံတောင် ၆၅၊ အရပ်တော် သံတောင် ၅၀၊ ၁ မိုက် ၄ သစ်ရှိသည်။",
         image: "/src/assets/KuToTaw/Main Pagoda/MainPagoda1.jpg",
    category: "Mandalay",
    features: ["ကမ္ဘာ့ အကြီးဆုံးစာအုပ်", ]
  },
  {
    id: 4,
    name: "",
    nameMyanmar: "အောင်တော်မူဘုရား",
    location: "မန္တလေးမြို့",
    description: "“မဟာလောကရန်နှိမ်”​နှင့်“လောကတန်ဆောင်”စေတီတို့မှာထိုခေတ်က ရန်အမျိုးမျိုးပေါ်ပေါက်သဖြင့် ရန်အမျိုးမျိုးနှိင်နှင်းအောင်မြင်ရန် ယတြာသဘောဖြင့် ခုနှစ်ထောက်ဘုရားများတည်ခဲ့သည်ဟုအဆိုရှိသည်။ မန္တလေးမြို့လူထုက “အောင်တော်မူဘုရား”ဟုခေါ်တွင်ကြသည်။မန္တလေး​မြို့တွင် မဟာမုနိရုပ်ရှင်တော်မြတ်ကြီးအား နံနက်အရုဏ်တက်တိုင်းမျက်နှာတော်သစ် အစဥ်အလာရှိခဲ့သည့် နည်းတူမဟာမြတ်မုနိကဲ့သို့ မျက်နှာတော်သစ်ဖူးမြှော်ရသော ဘုရားတစ်ဆူမှာ ဤ”မဟာလောကရန်နှိမ်အောင်တော်မူမြတ်စွာဘုရား”​ဖြစ်သည်။ ",
    descriptionMyanmar: "ဤ”မဟာလောကရန်နှိမ်စေတီတော်”ကို မန္တလေးမြို့၊ ချမ်း‌အေးသာစံမြို့နယ်၊ ပြည်ကြီးမျက်မှန်၊ အောင်တော်မူရပ်၌တည်ရှိပါသည်။ လမ်း(၂၉)နှင့် (၆၃)လမ်းအတွင်း ရှိသည်။",
    image: "/src/assets/AungTawMu/Main.jpg",
    category: "Mandalay",
    features: [""]
  },
  {
    id: 5,
    name: "",
    nameMyanmar: "ကျောက်တော်ကြီးဘုရား",
    location: "မန္တလေးမြို့",
    description: "“ရတနာပုံနေပြည်တော်” ဘွဲ့ခံ မန္တလေးမြို့တော်ကြီးကို ကုန်းဘောင်မင်း (၁၀)ဆက်မြောက် “သီရိပဝရဝိဇယာနန္တယသပဏ္ဍိတ မဟာဓမ္မရာဇာဓိရာဇာ” ဘွဲ့တော်ခံယူ တော်မူသည့် ပဉ္စမသင်္ဂါယနာတင်ဘဝရှင် မင်းတုန်းမင်းတရားကြီးက ကောဇာသက္ကရာဇ် (၁၂၂၁)ခုနှစ်တွင် တည်ထောင်တော်မူကာ နန်းမြို့တော်အား “လေးကျွန်းအောင်မြေ”၊ ရွှေနန်း တော်အား “မြနန်းစံကျော်” ဟု သမုတ်တော်မူကာ သုတိမင်္ဂလာအပေါင်းနှင့် ပြည့်စုံသည့်မြို့ ဖြစ်ပေသည်။ ထေရဝါဒဗုဒ္ဓသာသနာထွန်းကားသော မြို့ဖြစ်သည်နှင့်အညီ ယခုအခါတွင် ပြည်ထောင်စုမြန်မာနိုင်ငံတော်၏ “ယဉ်ကျေးမှုမြို့တော်” အဖြစ် ထင်ရှားပါသည်။",
    descriptionMyanmar: " ပဉ္စမသင်္ဂါယနာတင် ဘဝရှင်မင်းတုန်းမင်းတရားကြီးမှ မန္တလေးရွှေမြို့တော်ြကီး တည်ထောင်တော်မူပြီးနောက် (၅)နှစ်အကြာ ကောဇာသက္ကရာဇ် (၁၂၂၆)ခုနှစ် အခါသမယ တွင် မတ္တရာမြို့မြောက်ဘက် စကျင်ကျောက်ဖြူတောင်တန်းကြီး (၉)လုံးအနက် တောင်ဘက် အစွန်ဆုံးဖြစ်သော “ကာမတောင်(ဝါ)မြနီလာတောင်”ဟု အမည်ရသည့် “တောင်တော်ကြီး”မှ ဖြူဖွေးသန့်စင်၍ ကြီးမားကာ အပြစ်အနာအဆာကင်းသော သလင်းမျက်မြတ်ကျောက်ဖြူ တော်ကြီး ပေါ်ပေါက်တော်မူနေကြောင်း ဘဝရှင်မင်းတရားကြီး ထံတော်သို့ သံတော်ဦးတင် ကြရာ ပီတိသောမနဿသဒ္ဒါအဟုန်ဖြင့် ဝမ်းမြောက်ဝမ်းသာ ဖြစ်တော်မူကာ သက်ဆိုင်ရာ မှူးမတ်သေနာပတိများ၊ မဟာဒါန်ဝန်မင်းနှင့် ပန်းတမော့ ကျောက်ဆစ်လက်တတ်ပညာရှင် များအား ရတနာပုံမန္တလေးမြို့တော်သို့အရောက် ကျောက်တုံးတော်ကြီးအားပင့်ဆောင်စေရန် အမိန့်တော်များ ချမှတ်တော်မူပါသည်။ ထိုနှစ် တန်ဆောင်မုန်း လဆန်း (၂)ရက်(၃၁-၁၀-၁၈၆၄)နေ့တွင် ကျောက်တော်ကြီးရုပ်ပွား ဆင်းတုတော်ထုဆစ်မည့် ကျောက်တုံးတော်ကြီးသည် ကိန်းဝပ်စမ္ပါယ်တော်မူမည့် ထားရပ်ပလ္လင်တော်ပေါ်သို့ ရောက်ရှိ တော်မူခဲ့ပါသည်။",
    image: "/src/assets/KyaukTawGyi/Main.jpg",
    category: "Mandalay",
    features: [""]
  },
  {
    id: 2,
    name: "",
    nameMyanmar: "မဟာအံ့ထူးကံသာ မြတ်စွာဘုရား ",
    location: "ပြင်ဦးလွင်မြို့",
    description: "",
    descriptionMyanmar: "မန္တလေးမြို့ အောင်သီဟကျောက်ဆစ်လုပ်ငန်းမှ ဦးသောင်းထွန်း၊ ဒေါ်မမလေးတို့က ဉာဏ်တော်အမြင့် ၁၅ ပေ၊ ဒူးခေါင်းတော်အကျယ် ၈ ပေ ၆ လက်မနှင့် အလေးချိန် ၁၇ တန်ခန့်ရှိ ဆင်းတုတော်ကြီးကို ရွှေလီမြို့သို့ ပင့်ဆောင်ရန် မော်တော်ယာဉ်ဖြင့် မန္တလေးမှ သယ်ဆောင်လာစဉ် ပြင်ဦးလွင်မြို့နယ် ရေငယ်ကျေးရွာအလွန် မန္တလေး-လားရှိုးကားလမ်း မိုင်တိုင် ၄၇/၁ အရောက်တွင် မော်တော်ယာဉ်တိမ်းမှောက်ပြီး ဆင်းတုတော်ကြီးမှာ ကားပေါ်မှကျ၍ မြေခခဲ့သည်။ ဆင်းတုတော်ကြီး မြေခသည့်ရက်မှာ မြန်မာသက္ကရာဇ် ၁၃၅၈ ခုနှစ် တပေါင်းလပြည့်ကျော် ၁၄ ရက်နေ့ (၁၉၉၇ ခုနှစ် ဧပြီလ ၆ ရက်) တနင်္ဂနွေနေ့ ၁၁ နာရီအချိန်ခန့်ဖြစ်သည်။ ဆင်းတုတော်ကြီးအား ရွှေလီမြို့သို့ ဆက်လက်ပင့်ဆောင်ခြင်းမပြုတော့ပဲ အများလှူဒါန်းငွေ ၈၀၀,၀၀၀ ကျပ် နှင့် ထုလုပ်သူက လှူဒါန်းငွေ ၂၀၀,၀၀၀ ကျပ်၊ စုစုပေါင်း ၁,၀၀၀,၀၀၀ ကျပ်ဖြင့် ကျောက်ဆစ်လုပ်ငန်းရှင်အား ပေးချေ၍ လက်ရှိနေရာတွင် ပူဇော်ရန် ဆောင်ရွက်ခဲ့သည်။",
    image: "/src/assets/Mahar/Main.jpg",
    category: "Pyin Oo Lwin",
    features: [""]
  },

  {
    id: 1,
    name: " ",
    nameMyanmar: "မဟာမုနိ ရုပ်ရှင်တော်မြတ်ကြီး",
    location: "မန္တလေးမြို့",
    description: "မဟာမုနိ ရုပ်ရှင်တော်ကား ကမ္ဘာက လေးစားရသော သမိုင်းဝင် ရုပ်ပွားတော် တစ်ဆူဖြစ်ပါသည်။ မန္တလေးမြို့၏ ကျက်သရေဆောင် အဓိကရ ထင်ရှားသော ဘုရားတစ်ဆူလည်း ဖြစ်သည်။",
    descriptionMyanmar: "မဟာမုနိ ရုပ်ရှင်တော်မြတ်ကြီး သည် မြန်မာနိုင်ငံ၊ မန္တလေးတိုင်းဒေသကြီး၊ မန္တလေးမြို့တွင် တည်ရှိသည်။ မန္တလေး မဟာမုနိ ဘုရား ကို မဟာမြတ်မုနိဟူ၍ လည်းကောင်း၊ ဘုရားကြီးဟူ၍ လည်းကောင်းခေါ်ကြသည်။",
    image: "/src/assets/MaharMyatMuNi/Main.jpg",
    category: "Mandalay",
    features: [""]
  },
  {
    id: 6,
    name: "",
    nameMyanmar: "ဆူးလေဘုရား",
    location: "Yangon, Myanmar",
    description: "Ancient pagoda located in the heart of Yangon, surrounded by modern city life.",
    descriptionMyanmar: "ရန်ကုန်မြို့လယ်တွင် တည်ရှိသော ရှေးဟောင်းဘုရားဖြစ်ပြီး ခေတ်မီမြို့ပြဘဝဖြင့် ဝန်းရံထားသည်။",
    image: "/src/assets/Su Lay/0.jpg",
    category: "Yangon",
    features: [""]
  },

];

const categories = [
  { id: "all", name: "အားလုံး", nameEn: "All" },
  { id: "Mandalay", name: "မန္တလေး", nameEn: "Mandalay" },
  { id: "Pyin Oo Lwin", name: "ပြင်ဦးလွင်", nameEn: "Pyin Oo Lwin" },
  { id: "Yangon", name: "ရန်ကုန်", nameEn: "Yangon" }
];

export default function Pagodas() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPagoda, setSelectedPagoda] = useState<Pagoda | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              Lotus Shrine App မှ မျှဝေထားပါသည်
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

  // Removed unused download helper to keep Tailwind-only and clean

  return (
    <div className="bg-[#FDE9DA] w-full min-h-screen">
      <Navbar />

      {/* Hero Section - Tailwind only, consistent with other pages */}
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#402916] mb-4">ဘုရားများ</h1>
          <p className="text-lg text-[#4f3016] max-w-3xl mx-auto leading-relaxed">
            မြန်မာနိုင်ငံ၏  ဘုရားများနှင့် စေတီများကို ရှာဖွေလေ့လာပါ
          </p>
        </div>
        <div className="max-w-4xl mx-auto mt-6">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="flex items-center px-2">
              <Search className="w-5 h-5 text-gray-400 mr-2" />
                              <input
                  type="text"
                  placeholder="ဘုရားများရှာရန်..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 py-2"
                />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categories-section py-8">
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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPagodas.map((pagoda) => (
            <div
              key={pagoda.id}
              className="pagoda-card group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02]"
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
                      <p>ဤဘုရားကို မျှဝေရန်</p>
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
            </div>
          ))}
        </div>

        {filteredPagodas.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏛️</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">ဘုရားမတွေ့ပါ</h3>
            <p className="text-gray-500">ရှာဖွေမှု သို့မဟုတ် အမျိုးအစားစစ်ထုတ်မှုများကို ပြောင်းလဲကြည့်ပါ</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedPagoda && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            id="pagoda-modal-content"
            className="modal-content bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn"
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
                      if (selectedPagoda?.id === 3 || selectedPagoda?.id === 4 || selectedPagoda?.id === 5) { // Kuthodaw, Aung Taw Mu, Kyauk Taw Gyi
                        // Navigate to CCTV view page with pagoda info
                        navigate(`/pagoda-view/${selectedPagoda?.id}`, { 
                          state: { pagoda: selectedPagoda } 
                        });
                      } else {
                        // Show coming soon message
                        alert("ဤဘုရားအတွက် ရှိခိုးဆုတောင်းခြင်း ဝန်ဆောင်မှုကို မကြာမီ စတင်ပေးပါမည်။");
                      }
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    ဖူးမျှော်ရန်
                  </Button>
               </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
