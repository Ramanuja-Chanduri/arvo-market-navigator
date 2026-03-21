const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#000000]">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Orb 1 — deep purple */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full animate-orb-1 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(123,47,190,0.7) 0%, rgba(123,47,190,0) 70%)",
          filter: "blur(120px)",
          top: "10%",
          left: "20%",
        }}
      />

      {/* Orb 2 — electric blue */}
      <div
        className="absolute w-[700px] h-[700px] rounded-full animate-orb-2 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(59,111,232,0.65) 0%, rgba(59,111,232,0) 70%)",
          filter: "blur(140px)",
          top: "40%",
          right: "10%",
        }}
      />

      {/* Orb 3 — soft pink/magenta */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full animate-orb-3 mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(192,132,252,0.55) 0%, rgba(192,132,252,0) 70%)",
          filter: "blur(130px)",
          bottom: "5%",
          left: "40%",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
