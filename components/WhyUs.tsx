import Image from "next/image";
import { Check } from "lucide-react";
import { WHY_US_DATA } from "@/lib/data";

export default function WhyUs() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image (aspect ~ 8/7) */}
          <div className="w-full">
            <div className="relative aspect-[8/7] w-full overflow-hidden bg-slate-100 rounded-none">
              <Image
                src={WHY_US_DATA.image.src}
                alt={WHY_US_DATA.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover rounded-none"
              />
            </div>
          </div>

          {/* Right Column: Copy & Checklist */}
          <div>
            <span className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-3 font-medium block">
              {WHY_US_DATA.eyebrow}
            </span>

            <h2 className="text-3xl md:text-[36px] font-medium tracking-tight text-slate-900 mb-8 md:mb-10">
              {WHY_US_DATA.heading}
            </h2>

            <div className="space-y-6">
              {WHY_US_DATA.features.map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="mt-0.5 shrink-0">
                    <Check className="w-4 h-4 text-slate-900" strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-900 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
