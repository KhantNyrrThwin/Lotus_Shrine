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
      title: "Tayartaw Meditation Guide",
      titleBurmese: "တရားတော် သမ္မာသမ္မာဓိ",
      author: "Venerable Sayadaw",
      authorBurmese: "အရှင်ဘုရား",
      description: "A comprehensive guide to meditation practices and mindfulness techniques based on Buddhist teachings.",
      descriptionBurmese: "ဗုဒ္ဓဘာသာ သင်ကြားမှုများအပေါ် အခြေခံသော တရားရှုမှတ်ခြင်း နည်းလမ်းများနှင့် သတိရှိမှုနည်းပညာများ လမ်းညွှန်ချက်။",
      category: "Meditation",
      categoryBurmese: "တရားရှုမှတ်ခြင်း",
      filePath: "/src/assets/books/sample-book-1.pdf",
      pages: 156,
      language: "Burmese"
    },
    {
      id: 2,
      title: "Dhamma Teachings Collection",
      titleBurmese: "ဓမ္မဒေသနာ စုစည်းမှု",
      author: "Various Teachers",
      authorBurmese: "ဆရာများစွာ",
      description: "A collection of essential Dhamma teachings from various Buddhist masters and teachers.",
      descriptionBurmese: "ဗုဒ္ဓဘာသာ ဆရာများနှင့် ဆရာများထံမှ အဓိက ဓမ္မဒေသနာများ စုစည်းမှု။",
      category: "Dhamma",
      categoryBurmese: "ဓမ္မဒေသနာ",
      filePath: "/src/assets/books/sample-book-2.pdf",
      pages: 203,
      language: "Burmese"
    },
    {
      id: 3,
      title: "Mindfulness in Daily Life",
      titleBurmese: "နေ့စဉ်ဘဝတွင် သတိရှိမှု",
      author: "Venerable U Silananda",
      authorBurmese: "အရှင် ဦးသီလာနန္ဒ",
      description: "Practical applications of mindfulness and meditation in everyday activities and relationships.",
      descriptionBurmese: "နေ့စဉ်လုပ်ငန်းများနှင့် ဆက်ဆံရေးများတွင် သတိရှိမှုနှင့် တရားရှုမှတ်ခြင်း၏ လက်တွေ့အသုံးချမှုများ။",
      category: "Mindfulness",
      categoryBurmese: "သတိရှိမှု",
      filePath: "/src/assets/books/sample-book-1.pdf",
      pages: 89,
      language: "English"
    },
    {
      id: 4,
      title: "Buddhist Philosophy Fundamentals",
      titleBurmese: "ဗုဒ္ဓဘာသာ ဒဿနိကဗေဒ အခြေခံများ",
      author: "Dr. Maung Maung",
      authorBurmese: "ဒေါက်တာ မောင်မောင်",
      description: "An introduction to the fundamental principles and concepts of Buddhist philosophy and ethics.",
      descriptionBurmese: "ဗုဒ္ဓဘာသာ ဒဿနိကဗေဒနှင့် ကျင့်ဝတ်များ၏ အခြေခံမူများနှင့် အယူအဆများ မိတ်ဆက်။",
      category: "Philosophy",
      categoryBurmese: "ဒဿနိကဗေဒ",
      filePath: "/src/assets/books/sample-book-2.pdf",
      pages: 234,
      language: "Burmese"
    }
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
