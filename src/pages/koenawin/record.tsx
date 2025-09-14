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
      { id: "2025-07", username: "User Name", startDate: "2025-07-01", endDate: "2025-09-20" },
      { id: "2024-11", username: "User Name", startDate: "2024-11-05", endDate: "2025-01-24" },
      { id: "2024-03", username: "User Name", startDate: "2024-03-10", endDate: "2024-05-29" },
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

      // Background gradient (brand colors)
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#735240");
      gradient.addColorStop(1, "#4f3016");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Inner light panel
      const padding = 80;
      ctx.fillStyle = "#FDE9DA";
      ctx.fillRect(padding, padding, width - padding * 2, height - padding * 2);

      // Decorative border
      ctx.strokeStyle = "#8B4513";
      ctx.lineWidth = 6;
      ctx.strokeRect(padding + 10, padding + 10, width - (padding + 10) * 2, height - (padding + 10) * 2);

      // Title
      ctx.fillStyle = "#4f3016";
      ctx.textAlign = "center";
      ctx.font = "bold 64px Georgia, 'Times New Roman', serif";
      ctx.fillText("ကိုးနဝင်း အောင်မြင်မှု လက်မှတ်", width / 2, padding + 160);

      // Subtitle
      ctx.font = "28px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#735240";
      ctx.fillText("သင်၏ ကိုးနဝင်း အဓိဌာန်ကို အောင်မြင်စွာ ပြီးမြောက်ခဲ့သည်", width / 2, padding + 220);

      // Award emblem text
      ctx.font = "bold 40px Georgia, 'Times New Roman', serif";
      ctx.fillStyle = "#4f3016";
      ctx.fillText("သာဓု ၊ သာဓု ၊ သာဓု", width / 2, padding + 290);

      // Username
      ctx.font = "bold 54px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#4f3016";
      ctx.fillText(record.username, width / 2, padding + 380);

      // Dates row
      ctx.font = "28px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#735240";
      ctx.fillText(`စတင်နေ့စွဲ: ${formatDate(record.startDate)}`, width / 2, padding + 450);
      ctx.fillText(`ပြီးဆုံးနေ့စွဲ: ${formatDate(record.endDate)}`, width / 2, padding + 490);

      // Footer note
      ctx.font = "22px 'Noto Sans Myanmar', system-ui, sans-serif";
      ctx.fillStyle = "#735240";
      ctx.fillText("ကိုးနဝင်းစိတ်ဓာတ်ဖြင့် နေ့စဉ်ဘဝကို ဖြတ်သန်းနိုင်ပါစေ", width / 2, height - padding - 80);

      const url = canvas.toDataURL("image/png");
      setCertificateUrl(url);
      toast.success("လက်မှတ် ပြင်ဆင်ပြီးပါပြီ။");
    } catch (e) {
      toast.error("လက်မှတ် ထုတ်ပြန်ရာတွင် ပြဿနာ ဖြစ်ပွားပါသည်");
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