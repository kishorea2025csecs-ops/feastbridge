import { useState, useEffect } from "react";
import loadingFood from "@/assets/loading-food.png";
import { Leaf } from "lucide-react";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const finishTimer = setTimeout(onFinish, 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Animated food image */}
      <div className="animate-[bounce_1.5s_ease-in-out_infinite] mb-6">
        <img
          src={loadingFood}
          alt="Loading - hands holding food"
          width={180}
          height={180}
          className="drop-shadow-lg"
        />
      </div>

      {/* Brand */}
      <div className="flex items-center gap-2 mb-4 animate-fade-in">
        <Leaf className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Feast Bridge</h1>
      </div>

      <p className="text-muted-foreground text-sm animate-fade-in mb-8">
        Connecting surplus food with those who need it
      </p>

      {/* Loading bar */}
      <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{
            animation: "loading-bar 2.5s ease-in-out forwards",
          }}
        />
      </div>

      <p className="mt-10 text-xs text-muted-foreground animate-fade-in">
        By <strong className="text-foreground">Team Bug Busters</strong>
      </p>
    </div>
  );
};

export default SplashScreen;
