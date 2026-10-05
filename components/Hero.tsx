import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_DATA } from "@/lib/data";

export default function Hero() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy, CTA & Stats */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
              {HERO_DATA.eyebrow}
            </span>

            <h1 className="text-4xl md:text-[56px] md:leading-[1.15] font-medium tracking-tight text-slate-900 mb-6">
              Where Dubai
              <br />
              Gets
              <br />
              Ready.
            </h1>

            <p className="text-[15px] leading-relaxed text-slate-600 max-w-md mb-8">
              {HERO_DATA.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#booking"
                className="inline-flex items-center justify-center bg-slate-900 text-white h-11 px-7 text-[13px] font-medium rounded-none transition-colors duration-200 hover:bg-slate-800"
              >
                {HERO_DATA.primaryCta.label}
              </a>

              <a
                href={HERO_DATA.secondaryLink.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-900 transition-colors duration-200 hover:text-slate-600"
              >
                <span>{HERO_DATA.secondaryLink.label}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Divider and Stats */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                {HERO_DATA.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl sm:text-2xl font-medium tracking-tight text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="w-full">
            <div className="relative aspect-[1/1.04] w-full overflow-hidden bg-slate-100">
              <Image
                src={HERO_DATA.image.src}
                alt={HERO_DATA.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
