import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import lotusImg from "../assets/link_lotus.png";

function Gonetawkoeprr() {
  return (
    <>
      <div
        className="relative min-h-screen w-full bg-[#FDE9DA] flex flex-col"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        lang="my"
      >
        <Navbar />
        <div className="flex flex-col items-center justify-center flex-1 px-4 py-10">
          <h1 className="text-center mt-14 text-[30px] md:text-[35px] font-extrabold text-[#402916] drop-shadow-lg tracking-wide animate-fade-in">
            ဘုရားဂုဏ်‌ေတာ် (၉)ပါး
          </h1>
          <div className="mt-10 w-full max-w-2xl  bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col gap-10 border border-[#e2c7a6] animate-fade-in">
            {/* 1 */}
            <SectionCard title="အရဟံ ၊ အရဟံ ၊ အရဟံ" lotusImg={lotusImg}>
              ပူဇော်အထူးကို ခံယူတော်မူထိုက်သော မြတ်စွာဘုရား၊ ကိလေသာကင်းစင်တော်မူသော မြတ်စွာဘုရား စိတ်ကွယ်ရာအရပ်၌ပင် မကောင်းမှုကို ပြုတော်မမူသော မြတ်စွာဘုရား။
            </SectionCard>
            {/* 2 */}
            <SectionCard title='သမ္မာသမ္ဗုဒ္ဓေါ သမ္မာသ' lotusImg={lotusImg}>
              သိမြင်စရာအားလုံးတို့ကို အမှန်အတိုင်း ကိုယ်ပိုင်ဉာဏ်ဖြင့် မခြွင်းမချန် သိမြင်တော်မူသော မြတ်စွာဘုရား။ 
            </SectionCard>
            {/* 3 */}
            <SectionCard title="ဝိဇ္ဇာစရဏ သမ္ပန္နော" lotusImg={lotusImg}>
              ဝိဇ္ဇာ (၃)ပါး၊ ဝိဇ္ဇာ (၈)ပါး၊ အကျင့်သီလ (၁၅)ပါးတို့နှင့် ပြည့်စုံတော်မူသော မြတ်စွာဘုရား
            </SectionCard>
            {/* 4 */}
            <SectionCard title="သုဂတော" lotusImg={lotusImg}>
              ကောင်းသောစကား(မှန်ကန်၍အကျိုးရှိသောစကား)ကိုသာဆိုတော်မူသော မြတ်စွာဘုရား။
            </SectionCard>
            {/* 5 */}
            <SectionCard title="လောကဝိဒူ" lotusImg={lotusImg}>
              လောကသုံးပါးကို သိမြင်တော်မူသော မြတ်စွာဘုရား။ ( သတ္တလောက ၊ ဩကာသလောက ၊ သင်္ခါရလောက)
            </SectionCard>
            {/* 6 */}
            <SectionCard title="အနုတ္တရောပုရိသဓမ္မသာရထိ" lotusImg={lotusImg}>
              ဆုံးမထိုက်သော သတ္တဝါတို့ကို အတုမရှိ ဆုံးမတော်မူသော မြတ်စွာဘုရား။
            </SectionCard>
            {/* 7 */}
            <SectionCard title="သတ္တာဒေဝမနုဿနံ" lotusImg={lotusImg}>
              နတ်၊ လူတို့၏ ဆရာတစ်ဆူ ဖြစ်တော်မူသော မြတ်စွာဘုရား။
            </SectionCard>
            {/* 8 */}
            <SectionCard title="ဗုဒ္ဓေါ" lotusImg={lotusImg}>
              သစ္စာလေးပါးကို ကိုယ်တိုင်လည်းသိတော်မူ၊ သူတပါးတို့ကိုလည်း သိအောင်ဟောတော်မူသော မြတ်စွာဘုရား
            </SectionCard>
            {/* 9 */}
            <SectionCard title="ဘဂဝါ" lotusImg={lotusImg}>
              ဘုန်းတော်ခြောက်ပါး နှင့် ပြည့်စုံတော်မူသော မြတ်စွာဘုရား၊ (ဣဿရိယဘုန်းတော်၊ ဓမ္မဘုန်းတော်၊ ယသဘုန်းတော်၊ သီရိဘုန်းတော်၊ ကာမဘုန်းတော်၊ ပယတ္တဘုန်းတော်)
            </SectionCard>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function SectionCard({ title, children, lotusImg }: { title: string; children: React.ReactNode; lotusImg: string }) {
  return (
    <div className="relative group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#4f3016]/90 text-white shadow-xl border border-[#e2c7a6] transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in">
      <div className="flex flex-col items-center">
        <img src={lotusImg} alt="Lotus" className="w-10 h-10 mb-2 opacity-80 group-hover:scale-110 transition-transform duration-300" />
        <h3 className="text-[22px] md:text-[26px] font-bold tracking-wide drop-shadow-lg mb-2 animate-fade-in-up">
          {title}
        </h3>
      </div>
      <p className="text-[18px] md:text-[20px] text-[#fffbe9] text-center leading-relaxed animate-fade-in-up">
        {children}
      </p>
    </div>
  );
}

export default Gonetawkoeprr;
