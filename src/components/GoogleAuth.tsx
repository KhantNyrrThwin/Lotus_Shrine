import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

declare global {
  interface Window {
    google?: any;
  }
}

type GoogleAuthProps = {
  mode?: "signin" | "signup";
};

export default function GoogleAuth({ mode = "signin" }: GoogleAuthProps) {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

    if (!clientId) {
      // eslint-disable-next-line no-console
      console.error("VITE_GOOGLE_CLIENT_ID is not set");
      return;
    }

    function init() {
      if (initialized) return;
      if (!window.google || !buttonRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: any) => {
            try {
              const { credential } = response || {};
              if (!credential) return;

              const verifyResponse = await axios.post(
                "http://localhost/lotus_shrine/google-login.php",
                JSON.stringify({ credential }),
                {
                  headers: { "Content-Type": "application/json" },
                  withCredentials: true,
                },
              );

              const data = verifyResponse.data || {};
              if (data.success) {
                localStorage.setItem("isAuthenticated", "true");
                if (data.name) localStorage.setItem("userName", data.name);
                if (data.email) localStorage.setItem("userEmail", data.email);

                toast.success(
                  mode === "signup" ? "Google ဖြင့် အကောင့်ဖွင့်ပြီးပါပြီ" : "Google ဖြင့် ဝင်ရောက်ပြီးပါပြီ",
                  { description: "Lotus Shrine မှ ကြိုဆိုပါသည်", duration: 3000 },
                );
                navigate("/");
              } else {
                toast.error("Google အတည်ပြုမှု မအောင်မြင်ပါ", {
                  description: data.message || "ပြန်လည်ကြိုးစားပါ",
                  duration: 3000,
                });
              }
            } catch (error: any) {
              // eslint-disable-next-line no-console
              console.error(error);
              toast.error("Server connection failed", { duration: 3000 });
            }
          },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: mode === "signup" ? "signup_with" : "signin_with",
          logo_alignment: "left",
        });

        setInitialized(true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }

    if (window.google) {
      init();
      return;
    }

    // If the script isn't ready yet, watch for it
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);
        init();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [initialized, mode]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="h-px w-[80%] bg-[#4f3016]/20 my-2" />
      <div ref={buttonRef} className="flex items-center justify-center" />
    </div>
  );
}

