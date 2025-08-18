import "../App.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { Download, BookOpen, Search, Filter } from "lucide-react";

interface Book {
  id: number;
  title: string;
  titleBurmese: string;
  author: string;
  authorBurmese: string;
  description: string;
  descriptionBurmese: string;
  category: string;
  categoryBurmese: string;
  filePath: string;
  coverImage?: string;
  pages: number;
  language: string;
}

function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  // Sample books data - you can replace with your actual books
  const books: Book[] = [
    {
      id: 1,
      title: "ဝိပဿနာအခြေခံတရားတော်",
      titleBurmese: "ဝိပဿနာအခြေခံတရားတော်",
      author: "Venerable Sayadaw",
      authorBurmese: "မဟာစည်ဆရာတော် ဘုရားကြီး",
      description: "A comprehensive guide to meditation practices and mindfulness techniques based on Buddhist teachings.",
      descriptionBurmese: "ဝိပဿနာအခြေခံတရားတော်သည် သမယသုံးပါး၊ အနိစ္စ၊ ဒုက္ခ၊ အနတ္တ စသဖြင့် သဘာဝ၏ အမှန်တရားကို တိကျစွာတွေ့မြင်ရန် အခြေခံပညာကို သင်ကြားပေးသည့် တရားတော်ဖြစ်သည်။",
      category: "Meditation",
      categoryBurmese: "တရားရှုမှတ်ခြင်း",
      filePath: "/src/assets/books/14.pdf",
      pages: 156,
      language: "Burmese"
    },
    {
      id: 2,
      title: "(၉)ရက်စခန်း နိဗ္ဗာန်လမ်းတရားကျင့်စဉ်",
      titleBurmese: "(၉)ရက်စခန်း နိဗ္ဗာန်လမ်းတရားကျင့်စဉ်",
      author: "Various Teachers",
      authorBurmese: "ဆရာများစွာ",
      description: "(၉) ရက်စခန်း နိဗ္ဗာန်လမ်းတရားကျင့်စဉ်မှာ သံဃာပုဂ္ဂိုလ်များ အနိစ္စ၊ ဒုက္ခ၊ အနတ္တ တရားကို တရားမူတည်သဖြင့် စဉ်ဆက်မပြတ် သုံးသပ်၊ တရားကျင့်ကာ မေထုန်စဉ်အဆင့်ဆင့်ဖြတ်သန်း၍ နိဗ္ဗာန်သို့ ဦးတည်သည့် အလုပ်ရည်အကျိုးရရှိစေသည့် သုံးပတ်လုံး အဆင့်ဆင့် တရားပြုခြင်းဖြစ်သည်",
      descriptionBurmese: "(၉) ရက်စခန်း နိဗ္ဗာန်လမ်းတရားကျင့်စဉ်မှာ သံဃာပုဂ္ဂိုလ်များ အနိစ္စ၊ ဒုက္ခ၊ အနတ္တ တရားကို တရားမူတည်သဖြင့် စဉ်ဆက်မပြတ် သုံးသပ်၊ တရားကျင့်ကာ မေထုန်စဉ်အဆင့်ဆင့်ဖြတ်သန်း၍ နိဗ္ဗာန်သို့ ဦးတည်သည့် အလုပ်ရည်အကျိုးရရှိစေသည့် သုံးပတ်လုံး အဆင့်ဆင့် တရားပြုခြင်းဖြစ်သည်",
      category: "Dhamma",
      categoryBurmese: "ဓမ္မဒေသနာ",
      filePath: "/src/assets/books/12.pdf",
      pages: 203,
      language: "Burmese"
    },
    {
      id: 3,
      title: "သီတဂူဆရာတော်ဘုရား၏ငြိမ်းချမ်းရေးမြစ်နဒီတရားတော်",
      titleBurmese: "သီတဂူဆရာတော်ဘုရား၏ငြိမ်းချမ်းရေးမြစ်နဒီတရားတော်",
      author: "Venerable U Silananda",
      authorBurmese: "သီတဂူဆရာတော်ဘုရား",
      description: "**သီတဂူဆရာတော်ဘုရား၏ ငြိမ်းချမ်းရေးမြစ်နဒီတရားတော်** သည် ဗုဒ္ဓဘာသာ၏ ငြိမ်းချမ်းရေးနှင့် ညီညွတ်ရေးအပေါ် အခြေခံသော တရားတော်တစ်ပုဒ်ဖြစ်ပြီး၊ သီတဂူဆရာတော်ဦးဉာဏိဿရ (Sitagu Sayadaw) ဘုရားကြီးမှ ဟောကြားတော်မူသော တရားတော်တစ်ခုအနေဖြင့် လူသားတို့၏ ငြိမ်းချမ်းရေးနှင့် ညီညွတ်ရေးကို တိုက်တွန်းပေးသည်။ ဤတရားတော်ကို နားထောင်လိုပါက [YouTube](https://www.youtube.com/watch?v=PV84mahPZTQ) တွင် ရရှိနိုင်ပါသည်။",
      descriptionBurmese: "**သီတဂူဆရာတော်ဘုရား၏ ငြိမ်းချမ်းရေးမြစ်နဒီတရားတော်** သည် ဗုဒ္ဓဘာသာ၏ ငြိမ်းချမ်းရေးနှင့် ညီညွတ်ရေးအပေါ် အခြေခံသော တရားတော်တစ်ပုဒ်ဖြစ်ပြီး၊ သီတဂူဆရာတော်ဦးဉာဏိဿရ (Sitagu Sayadaw) ဘုရားကြီးမှ ဟောကြားတော်မူသော တရားတော်တစ်ခုအနေဖြင့် လူသားတို့၏ ငြိမ်းချမ်းရေးနှင့် ညီညွတ်ရေးကို တိုက်တွန်းပေးသည်။ ဤတရားတော်ကို နားထောင်လိုပါက [YouTube](https://www.youtube.com/watch?v=PV84mahPZTQ) တွင် ရရှိနိုင်ပါသည်။",
      category: "Mindfulness",
      categoryBurmese: "သတိရှိမှု",
      filePath: "/src/assets/books/11.pdf",
      pages: 89,
      language: "Burmese"
    },
      {
        id: 4,
        title: "ဓမ္မခရီးဖော် ",
        titleBurmese: "ဓမ္မခရီးဖော်  ",
        author: "အရှင်နာရဒါဘိဝံသ",
        authorBurmese: "အရှင်နာရဒါဘိဝံသ",
        description: "ဓမ္မခရီးဖော် ဆိုသည်မှာ ဗုဒ္ဓဘာသာအရ တရားကို နားလည်ခြင်း၊ သတိထားခြင်းနှင့် တရားကျင့်ခြင်းမှတဆင့် သန့်ရှင်းသောစိတ်နှင့် ငြိမ်းချမ်းသောဘဝကို ရရှိရန် လမ်းညွှန်ပေးသည့် ဓမ္မအကူအညီပေးသူ ကို ရည်ညွှန်းသည်။",
        descriptionBurmese: "ဓမ္မခရီးဖော် ဆိုသည်မှာ ဗုဒ္ဓဘာသာအရ တရားကို နားလည်ခြင်း၊ သတိထားခြင်းနှင့် တရားကျင့်ခြင်းမှတဆင့် သန့်ရှင်းသောစိတ်နှင့် ငြိမ်းချမ်းသောဘဝကို ရရှိရန် လမ်းညွှန်ပေးသည့် ဓမ္မအကူအညီပေးသူ ကို ရည်ညွှန်းသည်။",
        category: "Philosophy",
        categoryBurmese: "ဒဿနိကဗေဒ",
        filePath: "/src/assets/books/10.pdf",
        pages: 234,
        language: "Burmese"
      },
      {
        id: 5,
        title: "ဆင်းရဲငြိမ်းအေးချမ်းသာရေးတရားတော် ",
        titleBurmese: "ဆင်းရဲငြိမ်းအေးချမ်းသာရေးတရားတော်  ",
        author: "ချမ်းမြေ့ဆရာတော်",
        authorBurmese: "ချမ်းမြေ့ဆရာတော်",
        description: "ဆင်းရဲငြိမ်းအေးချမ်းသာရေး တရားတော် သည် ချမ်းမြေ့ဆရာတော် အရှင်ဇနကာဘိ၀ံသ (Chanmyay Sayadaw) မှ ဟောကြားတော်မူသော တရားတော်တစ်ပုဒ်ဖြစ်ပြီး၊ လူသားတို့၏ ဆင်းရဲမှ ငြိမ်းအေးခြင်း၊ ချမ်းသာခြင်းနှင့် စိတ်ချမ်းသာမှုရရှိရန် ဗုဒ္ဓဘာသာအရ လမ်းညွှန်ပေးသော အကြောင်းအရာများကို ပါဝင်သည်။",
        descriptionBurmese: "ဆင်းရဲငြိမ်းအေးချမ်းသာရေး တရားတော် သည် ချမ်းမြေ့ဆရာတော် အရှင်ဇနကာဘိ၀ံသ (Chanmyay Sayadaw) မှ ဟောကြားတော်မူသော တရားတော်တစ်ပုဒ်ဖြစ်ပြီး၊ လူသားတို့၏ ဆင်းရဲမှ ငြိမ်းအေးခြင်း၊ ချမ်းသာခြင်းနှင့် စိတ်ချမ်းသာမှုရရှိရန် ဗုဒ္ဓဘာသာအရ လမ်းညွှန်ပေးသော အကြောင်းအရာများကို ပါဝင်သည်။",
        category: "Philosophy",
        categoryBurmese: "ဒဿနိကဗေဒ",
        filePath: "/src/assets/books/8.pdf",
        pages: 234,
        language: "Burmese"
      },
      {
        id: 6,
        title: "တရားသုံးဖြာဆုံးမစာ ",
        titleBurmese: "တရားသုံးဖြာဆုံးမစာ  ",
        author: "အရှင် ဇနကာဘိဝံသ",
        authorBurmese: "အရှင် ဇနကာဘိဝံသ",
        description: "တရားသုံးဖြာဆုံးမစာ တရားတော် သည် ချမ်းမြေ့ဆရာတော် အရှင်ဇနကာဘိ၀ံသ (Chanmyay Sayadaw) မှ ဟောကြားတော်မူသော တရားတော်တစ်ပုဒ်ဖြစ်ပြီး၊ လူသားတို့၏ ဆင်းရဲမှ ငြိမ်းအေးခြင်း၊ ချမ်းသာခြင်းနှင့် စိတ်ချမ်းသာမှုရရှိရန် ဗုဒ္ဓဘာသာအရ လမ်းညွှန်ပေးသော အကြောင်းအရာများကို ပါဝင်သည်။",
        descriptionBurmese: "တရားသုံးဖြာဆုံးမစာ တရားတော် သည် ချမ်းမြေ့ဆရာတော် အရှင်ဇနကာဘိ၀ံသ (Chanmyay Sayadaw) မှ ဟောကြားတော်မူသော တရားတော်တစ်ပုဒ်ဖြစ်ပြီး၊ လူသားတို့၏ ဆင်းရဲမှ ငြိမ်းအေးခြင်း၊ ချမ်းသာခြင်းနှင့် စိတ်ချမ်းသာမှုရရှိရန် ဗုဒ္ဓဘာသာအရ လမ်းညွှန်ပေးသော အကြောင်းအရာများကို ပါဝင်သည်။",
        category: "Philosophy",
        categoryBurmese: "ဒဿနိကဗေဒ",
        filePath: "/src/assets/books/7.pdf",
        pages: 234,
        language: "Burmese"
      },
      

  ];

  const categories = ["all", "Meditation", "Dhamma", "Mindfulness", "Philosophy"];
  const languages = ["all", "Burmese", "English"];

  const categoryLabelMap: Record<string, string> = {
    all: "အမျိုးအစားအားလုံး",
    Meditation: "တရားရှုမှတ်ခြင်း",
    Dhamma: "ဓမ္မဒေသနာ",
    Mindfulness: "သတိရှိမှု",
    Philosophy: "ဒဿနိကဗေဒ",
  };
  const languageLabelMap: Record<string, string> = {
    all: "ဘာသာစကားအားလုံး",
    Burmese: "မြန်မာ",
    English: "အင်္ဂလိပ်",
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.titleBurmese.includes(searchTerm) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.authorBurmese.includes(searchTerm);
    
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesLanguage = selectedLanguage === "all" || book.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const handleDownload = (book: Book) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = book.filePath;
    link.download = `${book.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRead = (book: Book) => {
    // Open PDF in new tab for reading
    window.open(book.filePath, '_blank');
  };

  return (
    <>
      <div className="bg-[#FDE9DA] w-full min-h-screen">
        <Navbar />
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pt-20 pb-12 px-4"
        >
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#402916] mb-4">
              တရားတော် စာအုပ်များ
            </h1>
            <p className="text-lg text-[#4f3016] max-w-3xl mx-auto leading-relaxed">
              ဗုဒ္ဓဘာသာ သင်ခန်းစာများ၊ တရားရှုမှတ်ခြင်း လမ်းညွှန်များနှင့် ဉာဏ်တော်ကို အချိန်မရွေး ဖတ်ရှုလေ့လာနိုင်ပါသည်။ ဒေါင်းလုဒ်ဆွဲ၍ အော့ဖ်လိုင်းဖြင့်လည်း ဖတ်ရှုနိုင်ပါသည်။
            </p>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto px-4 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="စာအုပ်ရှာရန်..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f3016] focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f3016] focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {categoryLabelMap[category] ?? category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f3016] focus:border-transparent"
                >
                  {languages.map(language => (
                    <option key={language} value={language}>
                      {languageLabelMap[language] ?? language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto px-4 pb-16"
        >
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-[#402916] mb-2">စာအုပ်မတွေ့ပါ</h3>
              <p className="text-[#735240]">ရှာဖွေမှု သို့မဟုတ် စစ်ထုတ်မှုများကို ပြောင်းလဲကြည့်ပါ</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Book Cover */}
                  <div className="h-48 bg-gradient-to-br from-[#4f3016] to-[#735240] rounded-t-2xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen className="w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm opacity-90">{languageLabelMap[book.language] ?? book.language}</p>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-[#402916] mb-2 line-clamp-2">
                        {book.titleBurmese}
                      </h3>
                      <p className="text-[#4f3016] text-sm">
                        ရေးသားသူ: {book.authorBurmese}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {book.descriptionBurmese}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="bg-[#FDE9DA] px-3 py-1 rounded-full text-[#4f3016] font-medium">
                        {book.categoryBurmese}
                      </span>
                      <span>{book.pages} စာမျက်နှာ</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleRead(book)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#4f3016] text-white py-3 px-4 rounded-xl hover:bg-[#735240] transition-colors duration-200"
                      >
                        <BookOpen className="w-4 h-4" />
                        ဖတ်ရှုရန်
                      </button>
                      <button
                        onClick={() => handleDownload(book)}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#735240] text-white py-3 px-4 rounded-xl hover:bg-[#4f3016] transition-colors duration-200"
                      >
                        <Download className="w-4 h-4" />
                        သိမ်းမည်
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
      

        <Footer />
      </div>
    </>
  );
}

export default BooksPage;
