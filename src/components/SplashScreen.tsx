import { useState, useEffect, useRef } from "react";
import { Leaf } from "lucide-react";
import splashVideo from "@/assets/splash-video.mp4.asset.json";

const STEPS = [
  { icon: "🍽️", label: "Packing surplus food…" },
  { icon: "🚚", label: "Loading the truck…" },
  { icon: "❤️", label: "Delivering to those in need…" },
];

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [step, setStep] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Cycle through story steps
    const t1 = setTimeout(() => setStep(1), 1600);
    const t2 = setTimeout(() => setStep(2), 3200);
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const finishTimer = setTimeout(onFinish, 5200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={splashVideo.url}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-2 animate-fade-in">
          <Leaf className="h-8 w-8 text-primary drop-shadow-lg" />
          <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
            Feast Bridge
          </h1>
        </div>

        {/* Story steps */}
        <div className="mb-10 flex flex-col items-center gap-3">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-md border border-white/10 transition-all duration-700 ${
                i <= step
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-4 scale-95"
              } ${i === step ? "ring-2 ring-primary/60 bg-white/20" : ""}`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm font-medium text-white/90">{s.label}</span>
              {i < step && (
                <span className="ml-1 text-green-400 animate-scale-in">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Loading bar */}
        <div className="w-56 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary"
            style={{ animation: "loading-bar 4.5s ease-in-out forwards" }}
          />
        </div>

        <p className="mt-8 text-xs text-white/60 animate-fade-in">
          By <strong className="text-white/80">Team Bug Busters</strong>
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
