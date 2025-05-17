export default function InfoTicker() {
  const phrase = "Место, где энергия, забота и вдохновение соединяются • ";

  return (
    <div className="relative overflow-hidden bg-[#F8F0DE] border-b border-[#004018]/10 text-[#004018] text-[13px] sm:text-sm font-light tracking-normal select-none">
      <div className="flex animate-marquee group hover:[animation-play-state:paused]">
        <div className="flex shrink-0">
          <span className="px-6 py-2 italic whitespace-nowrap opacity-90">
            {phrase.repeat(20)}
          </span>
        </div>
        <div className="flex shrink-0">
          <span className="px-6 py-2 italic whitespace-nowrap opacity-90">
            {phrase.repeat(20)}
          </span>
        </div>
      </div>
    </div>
  );
}
