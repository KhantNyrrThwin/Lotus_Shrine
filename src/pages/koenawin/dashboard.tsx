import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  Info, 
  User, 
  LogOut
} from "lucide-react";

import Navbar from "../../components/navbar";
import { authService } from "../../data/authService";
import { toast } from "sonner";

// Import UI components
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger
} from "../../components/ui/sidebar";

// Dashboard Components
import HomeDashboard from "./HomeDashboard";
import InformationDashboard from "./InformationDashboard";

const KoeNaWinDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("User Name");
  const [currentView, setCurrentView] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const auth = authService.isAuthenticated();
      if (!auth) {
        toast.error("အကောင့်ဝင်ရန် လိုအပ်ပါသည်", {
          description: "ကျေးဇူးပြု၍ အကောင့်ဝင်ပါ။",
        });
        navigate("/login");
        return;
      }
      
      setIsAuthenticated(true);
      const user = authService.getCurrentUser();
      setUsername(user);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    toast.success("အကောင့်မှ ထွက်ပြီးပါပြီ", {
      description: "ကျေးဇူးတင်ပါသည်။ ပြန်လည်ဝင်ရောက်နိုင်ပါသည်။",
    });
    navigate("/");
  };

  const handleNavigation = (view: string) => {
    setCurrentView(view);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="bg-[#FDE9DA] min-h-screen">
        <Navbar />
        
        <div className="flex pt-[58px]">
          {/* Sidebar */}
          <Sidebar className="bg-[#4f3016] text-white border-r border-[#3a2411]">
            <SidebarHeader className="p-4 border-b border-[#3a2411]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#735240] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{username}</span>
                  <span className="text-xs text-[#a8a8a8]">ကိုးနဝင်းအသုံးပြုသူ</span>
                </div>
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation("home")}
                    isActive={currentView === "home"}
                    tooltip="ပင်မစာမျက်နှာ"
                  >
                    <Home className="w-4 h-4" />
                    <span>ပင်မစာမျက်နှာ</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => handleNavigation("info")}
                    isActive={currentView === "info"}
                    tooltip="ကိုးနဝင်း အချက်အလက်"
                  >
                    <Info className="w-4 h-4" />
                    <span>ကိုးနဝင်း အချက်အလက်</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate("/profile")}
                    tooltip="ပရိုဖိုင်"
                  >
                    <User className="w-4 h-4" />
                    <span>ပရိုဖိုင်</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    tooltip="ထွက်ရန်"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>ထွက်ရန်</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-2xl font-bold text-[#4f3016]">
                  {currentView === "home" ? "ပင်မစာမျက်နှာ" : "ကိုးနဝင်း အချက်အလက်"}
                </h1>
              </div>
              
              <div className="flex items-center gap-2 bg-[#735240] text-white px-4 py-2 rounded-lg">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{username}</span>
              </div>
            </div>

            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentView === "home" && <HomeDashboard username={username} />}
              {currentView === "info" && <InformationDashboard />}
            </motion.div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default KoeNaWinDashboard;
