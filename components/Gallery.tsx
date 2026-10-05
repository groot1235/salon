import Image from "next/image";
import { GALLERY_DATA } from "@/lib/data";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-slate-50 py-24 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
            {GALLERY_DATA.eyebrow}
          </span>
          <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900">
            {GALLERY_DATA.heading}
          </h2>
        </div>

        {/* 4x2 Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2">
          {GALLERY_DATA.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[2/3] w-full overflow-hidden bg-slate-200 rounded-none group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                className="object-cover rounded-none transition-opacity duration-300 group-hover:opacity-85"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
