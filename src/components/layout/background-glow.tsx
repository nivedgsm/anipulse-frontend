export function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* TOP RIGHT */}
      <div className="absolute right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[120px]" />

      {/* LEFT */}
      <div className="absolute left-[-100px] top-[40%] h-[320px] w-[320px] rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* BOTTOM */}
      <div className="absolute bottom-[-150px] right-[20%] h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px]" />

    </div>
  );
}