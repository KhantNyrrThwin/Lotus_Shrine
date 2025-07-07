import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#4f3016",
          "--normal-text": "#ffffff",
          "--normal-border": "#ffffff",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
