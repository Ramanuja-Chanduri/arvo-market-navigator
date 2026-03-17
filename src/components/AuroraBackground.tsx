const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="aurora-blob-1 absolute -top-20 -left-20 w-96 h-96 rounded-full blur-[100px] bg-[hsl(221,83%,53%)]/20" />
      <div className="aurora-blob-2 absolute top-1/2 left-1/4 w-80 h-80 rounded-full blur-[80px] bg-[hsl(187,86%,53%)]/15" />
      <div className="aurora-blob-3 absolute bottom-0 right-0 w-72 h-72 rounded-full blur-[90px] bg-[hsl(25,95%,53%)]/10" />
    </div>
  );
};

export default AuroraBackground;
