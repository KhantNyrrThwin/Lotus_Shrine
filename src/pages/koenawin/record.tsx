import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import {
  Award,
  CalendarRange,
  User,
  Download,
  Facebook,
  Instagram,
  Send,
  Trophy
} from "lucide-react";

type HistoryRecord = {
  id: string;
  username: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("my-MM", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function RecordDashboard() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const historyData: HistoryRecord[] = useMemo(
    () => [
      { id: "2025-07", username: "ခန့်ညားသွင်", startDate: "2025-07-01", endDate: "2025-09-20" },
    ],
    []
  );

  useEffect(() => {
    if (!selectedId && historyData.length > 0) {
      setSelectedId(historyData[0].id);
    }
  }, [historyData, selectedId]);

  const selectedRecord = useMemo(() => historyData.find(h => h.id === selectedId) || null, [historyData, selectedId]);

  const generateCertificate = async (record: HistoryRecord) => {
    try {
      const width = 1400;
      const height = 900;
      const canvas = (canvasRef.current ||= document.createElement("canvas"));
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Load and draw background image
      const backgroundImage = new Image();
      await new Promise((resolve, reject) => {
        backgroundImage.onload = resolve;
        backgroundImage.onerror = reject;
        backgroundImage.src = "/src/assets/Certi BG.jpg";
      });
      
      // Draw background image to fill entire canvas
      ctx.drawImage(backgroundImage, 0, 0, width, height);

      // Add subtle overlay for better text readability
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Add elegant border frame
      const borderPadding = 60;
      ctx.strokeStyle = "#8B5A3C";
      ctx.lineWidth = 8;
      ctx.strokeRect(borderPadding, borderPadding, width - borderPadding * 2, height - borderPadding * 2);
      
      // Inner decorative border
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 3;
      ctx.strokeRect(borderPadding + 20, borderPadding + 20, width - (borderPadding + 20) * 2, height - (borderPadding + 20) * 2);

      // Load and draw logo with shadow effect
      const logoImage = new Image();
      await new Promise((resolve, reject) => {
        logoImage.onload = resolve;
        logoImage.onerror = reject;
        logoImage.src = "/src/assets/logo.png";
      });
      
      // Draw logo with shadow
      const logoSize = 140;
      const logoX = (width - logoSize) / 2;
      const logoY = 100;
      
      // Logo shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
      
      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Project title with elegant styling (smaller size)
      ctx.textAlign = "center";
      ctx.font = "bold 36px 'Playfair Display', Georgia, 'Times New Roman', serif";
      
      // Title shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = "#f3f2f2";
      ctx.fillText("Lotus Shrine", width / 2, logoY + logoSize + 50);
      
      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Decorative line under title
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 150, logoY + logoSize + 80);
      ctx.lineTo(width / 2 + 150, logoY + logoSize + 80);
      ctx.stroke();

      // Subtitle with elegant styling (bigger size)
      ctx.font = "bold 40px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("ကိုးနဝင်း အဓိဌာန် အောင်မြင်ခြင်း", width / 2, logoY + logoSize + 150);

      // Username with special styling
      ctx.font = "bold 58px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#1A0E08";
      
      // Username background highlight
      const usernameMetrics = ctx.measureText(record.username);
      const usernameWidth = usernameMetrics.width;
      const usernameY = logoY + logoSize + 240;
      
    
      
      // Username text
      ctx.fillStyle = "#f8d9ad";
      ctx.fillText(`" ${(record.username)} "`, width / 2, usernameY);

      // Dates with elegant styling
      ctx.font = "32px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#f3f2f2";
      
      // Start date
      ctx.fillText(`စတင်နေ့စွဲ: ${formatDate(record.startDate)}`, width / 2, usernameY + 90);
      
      // End date
      ctx.fillText(`ပြီးဆုံးနေ့စွဲ: ${formatDate(record.endDate)}`, width / 2, usernameY + 140);

      // Decorative element before footer
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 150, usernameY + 200);
      ctx.lineTo(width / 2 + 150, usernameY + 200);
      ctx.stroke();

      // Footer recognition text with elegant styling
      ctx.font = "22px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#ffffff";
      const footerText = "အဆိုပါအသုံးပြုသူသည် \"ကိုးနဝင်း\" လုပ်ငန်းစဉ် ကို အောင်မြင်စွာ ပြီးမြောက်ခဲ့ကြောင်း ✨ Lotus Shrine Project အဖွဲ့မှ ✨အသိအမှတ်ပြုပါသည်။";
      
      // Split long text into multiple lines if needed
      const maxWidth = width - 600;
      const words = footerText.split(' ');
      let line = '';
      let y = height - 160;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, width / 2, y);
          line = words[n] + ' ';
          y += 35;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, width / 2, y);

      // Add subtle corner decorations
      const cornerSize = 40;
      ctx.strokeStyle = "#D4AF37";
      ctx.lineWidth = 3;
      
      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(borderPadding + 30, borderPadding + 30);
      ctx.lineTo(borderPadding + 30, borderPadding + 30 + cornerSize);
      ctx.lineTo(borderPadding + 30 + cornerSize, borderPadding + 30);
      ctx.stroke();
      
      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(width - borderPadding - 30, borderPadding + 30);
      ctx.lineTo(width - borderPadding - 30 - cornerSize, borderPadding + 30);
      ctx.lineTo(width - borderPadding - 30, borderPadding + 30 + cornerSize);
      ctx.stroke();
      
      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(borderPadding + 30, height - borderPadding - 30);
      ctx.lineTo(borderPadding + 30 + cornerSize, height - borderPadding - 30);
      ctx.lineTo(borderPadding + 30, height - borderPadding - 30 - cornerSize);
      ctx.stroke();
      
      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(width - borderPadding - 30, height - borderPadding - 30);
      ctx.lineTo(width - borderPadding - 30, height - borderPadding - 30 - cornerSize);
      ctx.lineTo(width - borderPadding - 30 - cornerSize, height - borderPadding - 30);
      ctx.stroke();

      const url = canvas.toDataURL("image/png");
      setCertificateUrl(url);
      toast.success("လက်မှတ် ပြင်ဆင်ပြီးပါပြီ။");
    } catch (e) {
      toast.error("လက်�မှတ် ထုတ်ပြန်ရာတွင် ပြဿနာ ဖြစ်ပွားပါသည်");
    }
  };

  const handleDownload = () => {
    if (!certificateUrl) return;
    const link = document.createElement("a");
    link.href = certificateUrl;
    link.download = "koe-na-win-certificate.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("လက်မှတ် ကို ဒေါင်းလုတ်လုပ်နေပါသည်");
  };

  const siteUrl = typeof window !== "undefined" ? `${window.location.origin}/koe-na-win-dashboard` : "https://example.com";
  const shareText = "ကျွန်ုပ်၏ ကိုးနဝင်း အဓိဌာန်ကို အောင်မြင်စွာ ပြီးမြောက်ခဲ့ကြောင်း ဝမ်းသာစွာမျှဝေပါသည်။";

  const shareTo = (platform: "facebook" | "instagram" | "telegram") => {
    const urlEncoded = encodeURIComponent(siteUrl);
    const textEncoded = encodeURIComponent(shareText);

    if (navigator.share) {
      // Web Share API (best effort; images as data URLs are not widely supported)
      navigator.share({ title: "Koe Na Win Certificate", text: shareText, url: siteUrl }).catch(() => {
        /* ignore */
      });
      return;
    }

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}&quote=${textEncoded}`, "_blank");
        break;
      case "instagram":
        toast.info("Instagram သို့ တိုက်ရိုက်မျှဝေမည်ဆိုပါက ဓာတ်ပုံကို ဒေါင်းလုတ်လုပ်ပြီး app ထဲမှ တင်ပါ။");
        window.open("https://www.instagram.com/", "_blank");
        break;
      case "telegram":
        window.open(`https://t.me/share/url?url=${urlEncoded}&text=${textEncoded}`, "_blank");
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6 w-[calc(100vw-312.5px)]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="bg-gradient-to-r from-[#735240] to-[#4f3016] text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              ကိုးနဝင်း မှတ်တမ်း
            </CardTitle>
            <CardDescription className="text-[#e0e0e0]">ပြီးမြောက်ခဲ့သည့် မှတ်တမ်းများ နှင့် ဒစ်ဂျီတယ် လက်မှတ်</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* History List */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <h2 className="text-2xl font-extrabold text-[#4f3016] flex items-center gap-2">
                <CalendarRange className="w-5 h-5" />
                ပြီးမြောက်မှတ်တမ်းများ
              </h2>
              <CardDescription className="text-[#735240]">Username၊ စတင်နေ့စွဲ နှင့် ပြီးဆုံးနေ့စွဲ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {historyData.map((item) => (
                <div key={item.id} className={`p-4 rounded-lg border flex items-center justify-between gap-4 ${selectedId === item.id ? "bg-amber-50 border-amber-200" : "bg-[#FDE9DA] border-[#e2c8b5]"}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[#4f3016] font-semibold">
                      <User className="w-4 h-4" />
                      <span>{item.username}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-[#735240]">
                      <div>စတင်နေ့စွဲ: {formatDate(item.startDate)}</div>
                      <div>ပြီးဆုံးနေ့စွဲ: {formatDate(item.endDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white border-0 cursor-pointer"
                      onClick={() => {
                        setSelectedId(item.id);
                        generateCertificate(item);
                      }}
                    >
                      <Award className="w-4 h-4" />
                      လက်မှတ် ထုတ်ယူမည်
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Certificate Preview & Actions */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="bg-white border-[#4f3016]">
            <CardHeader>
              <h2 className="text-2xl font-extrabold text-[#4f3016] flex items-center gap-2">
                <Award className="w-5 h-5" />
                ဒစ်ဂျီတယ် လက်မှတ်
              </h2>
              <CardDescription className="text-[#735240]">ဒေါင်းလုတ် ပြုလုပ်မည်၊ သို့မဟုတ် မျှဝေမည်</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[14/9] w-full bg-[#FDE9DA] border border-[#e2c8b5] rounded-lg flex items-center justify-center overflow-hidden">
                {certificateUrl ? (
                  <img src={certificateUrl} alt="Certificate Preview" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-[#735240] text-center px-6">
                    <p>လက်မှတ် မရှိသေးပါ။ ကိုယ်လိုချင်သော မှတ်တမ်းတွင် "လက်မှတ် ထုတ်ယူမည်" ကို နှိပ်ပါ။</p>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] hover:from-[#A0522D] hover:to-[#8B4513] text-white border-0 cursor-pointer"
                  onClick={() => selectedRecord && generateCertificate(selectedRecord)}
                >
                  <Award className="w-4 h-4" /> လက်မှတ် ပြန်ထုတ်မည်
                </Button>
                <Button
                  variant="outline"
                  className="border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white"
                  onClick={handleDownload}
                  disabled={!certificateUrl}
                >
                  <Download className="w-4 h-4" /> ဒေါင်းလုတ်လုပ်မည်
                </Button>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant="outline" className="border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white" onClick={() => shareTo("facebook")}> 
                    <Facebook className="w-4 h-4" /> Facebook
                  </Button>
                  <Button variant="outline" className="border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white" onClick={() => shareTo("instagram")}>
                    <Instagram className="w-4 h-4" /> Instagram
                  </Button>
                  <Button variant="outline" className="border-[#4f3016] text-[#4f3016] hover:bg-[#4f3016] hover:text-white" onClick={() => shareTo("telegram")}>
                    <Send className="w-4 h-4" /> Telegram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Hidden canvas element for certificate rendering */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}